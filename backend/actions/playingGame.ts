import { GAME_STATUS, ROUND_STATUS, RULE } from "../../frontend/src/interfaces/IuiGameOptions";
import {
  IuiCard,
  IuiCardPlayed,
  IuiGetGameInfoRequest,
  IuiGetGameInfoResponse,
  IuiGetRoundRequest,
  IuiGetRoundResponse,
  IuiMakePromiseRequest,
  IuiMakePromiseResponse,
  IuiParsedHumanPlayer,
  IuiPlayCardRequest,
  IuiPlayCardResponse,
  IuiPlayerPromise,
  IuiPlayerStats,
  IuiPromiseTable,
  IuiRoundPlayer,
  IuiRoundToPlayer,
  IuiRoundTotalPromise,
  ROUND_PHASE,
} from "../../frontend/src/interfaces/IuiPlayingGame";
import {
  getCurrentCardInCharge,
  getCurrentPlayIndex,
  getMyCards,
  getPlayableCardIndexes,
  getPlayerInTurn,
  getPromiser,
  winnerOfPlay,
} from "../common/common";
import { ICardToIuiCard, isRuleActive, rulesToRuleObj } from "../common/model";
import { getGame, getGameWithPlayer, makePromiseToPlayer, playerPlaysCard } from "../dbActions/playingGame";
import { ICardPlayed, IGameOptions, IRound } from "../interfaces/IGameOptions";

export const getRound = async (getRoundObj: IuiGetRoundRequest): Promise<IuiGetRoundResponse | null> => {
  const {gameId, userName, roundInd} = getRoundObj;
  const gameInDb = await getGame(gameId);

  if (!gameInDb || !gameInDb.humanPlayers.find(player => player.name === userName || player.playedBy === userName)) {
    return null;
  }

  const originalPlayerName = gameInDb.humanPlayers.find(player => player.playedBy === userName)?.name;

  const roundResponse: IuiGetRoundResponse = {
    gameId: gameId,
    roundInd: roundInd,
    userName: originalPlayerName ?? userName,
    roundToPlayer: roundToPlayer(gameInDb, roundInd, userName, originalPlayerName),
  };
  return roundResponse;
};

export const getGameInfo = async (getGameInfoRequest: IuiGetGameInfoRequest): Promise<IuiGetGameInfoResponse | null> => {
  const {gameId, userName} = getGameInfoRequest;
  const gameInDb = await getGameWithPlayer(gameId, userName);
  if (gameInDb) {
    return gameToGameInfo(gameId, gameInDb);
  } else {
    return null;
  }
};

const parsePlayerStats = (gameInDb: IGameOptions, playerName: string): IuiPlayerStats => {
  return {
    playerAvgPointsInRounds: gameInDb.humanPlayers.find(player => player.name == playerName)?.playerStats.playerAvgPointsInRounds ?? [],
  } as IuiPlayerStats;
};

const getPlayerPlayedCard = (name: string, cardsPlayed: ICardPlayed[], returnCard: boolean): IuiCard | null => {
  const cardPlayed = cardsPlayed.find(cardPlayed => cardPlayed.name === name);
  if (cardPlayed) {
    return returnCard ? ICardToIuiCard(cardPlayed.card) : { suite: "dummy", value: 0, rank: "" } as IuiCard;
  }
  return null;
};

const getRoundPlayers = (name: string, round: IRound, playIndex: number, showPromises: boolean, originalPlayerName?: string): IuiRoundPlayer[] => {
  const players: IuiRoundPlayer[] = [];
  // TODO const firstPlayerInThePlay = getFirstPlayerInThePlay(round, play);
  // TODO const lastPlayerInThePlay = getLastPlayerInThePlay(round, play);

  round.roundPlayers.forEach((player, idx) => {
    const thisIsMe = player.name === name || player.name === originalPlayerName;
    const returnCard = thisIsMe || true; // TODO || module.exports.okToReturnCard(hiddenCardsMode, player.name == firstPlayerInThePlay, player.name == lastPlayerInThePlay, player.name == playerGoingToWinThisPlay);
    players.push({
      thisIsMe: thisIsMe,
      dealer: round.dealerPositionIndex === idx,
      name: player.name,
      promise: showPromises || thisIsMe ? player.promise : (player.promise === null) ? null : -1,
      keeps: player.keeps,
      cardPlayed: getPlayerPlayedCard(player.name, round.cardsPlayed[playIndex], returnCard),
      speedPromisePoints: player.speedPromisePoints,
      speedPromiseTotal: player.speedPromiseTotal,
    });

  });

  return players;
};

const getPromisesByPlayers = (gameInDb: IGameOptions): IuiPlayerPromise[][] => {
  const game = gameInDb.game;
  const promisesByPlayers: IuiPlayerPromise[][] = [];
  for (let i = 0; i < game.playerOrder.length; i++) {
    const playerPromises: IuiPlayerPromise[] = [];
    for (let j = 0; j < game.rounds.length; j++) {
      const roundPlayer = game.rounds[j].roundPlayers[i];
      playerPromises.push({
        // TODO promise: showPromisesNow('player', thisGame, j) ? game.rounds[j].roundPlayers[i].promise : null,
        promise: roundPlayer.promise,
        keep: roundPlayer.keeps,
        points: roundPlayer.points,
        speedPromisePoints: roundPlayer.speedPromisePoints,
        speedPromiseTotal: roundPlayer.speedPromiseTotal,
      } as IuiPlayerPromise);
    }
    promisesByPlayers.push(playerPromises);
  }
  return promisesByPlayers;
};

const getPromiseTable = (gameInDb: IGameOptions): IuiPromiseTable => {
  const game = gameInDb.game;
  return {
    players: game.playerOrder.map(player => player.name),
    promisesByPlayers: getPromisesByPlayers(gameInDb),
    rounds: game.rounds.map(round => {
      return {
        cardsInRound: round.cardsInRound,
        totalPromise: round.totalPromise, // TODO showPromisesNow('total', thisGame, j)
      } as IuiRoundTotalPromise;
    }),
  } as IuiPromiseTable;
};

const isMyPromiseTurn = (name: string, round: IRound, originalPlayerName?: string): boolean => {
  const promiser = getPromiser(round);
  if (promiser) {
    return promiser.name === name || promiser.name === originalPlayerName;
  } else {
    return false;
  }
};

export const getRoundPhase = (round: IRound): ROUND_PHASE => {
  const cardsInRound = round.cardsInRound;
  const playerCount = round.roundPlayers.length;
  if (round.cardsPlayed.filter(play => play.length === playerCount).length === cardsInRound) return ROUND_PHASE.played;
  if (round.roundPlayers.filter(player => player.promise !== null).length === playerCount) return ROUND_PHASE.onPlay;
  if (round.roundPlayers.filter(player => player.promise !== null).length !== playerCount) return ROUND_PHASE.onPromises;
  return ROUND_PHASE.initial;
};

const getCardsPlayed = (round: IRound, playIndex: number): IuiCardPlayed[] => {
  const playedCards: IuiCardPlayed[] = [];
  round.cardsPlayed[playIndex].forEach(playedCard => {
    playedCards.push({
      card: ICardToIuiCard(playedCard.card),
      name: playedCard.name,
    } as IuiCardPlayed);
  });
  return playedCards;
};

const starterOfThisPlay = (round: IRound, playInd: number): string => {
  if (playInd === 0) {
    return round.roundPlayers[round.starterPositionIndex].name;
  } else {
    return winnerOfPlay(round.cardsPlayed[playInd-1], round.trumpCard.suite)?.name ?? "";
  }
};

const roundToPlayer = (gameInDb: IGameOptions, roundInd: number, name: string, originalPlayerName?: string): IuiRoundToPlayer => {
  const gameIsPlayed = gameInDb.gameStatus === GAME_STATUS.played;
  const round = gameInDb.game.rounds[roundInd];
  const playIndex = getCurrentPlayIndex(round);
  const playerInTurn = gameIsPlayed ? null : getPlayerInTurn(round);
  const isNowMyTurn = playerInTurn?.name === name || playerInTurn?.name === originalPlayerName;
  const myCards = getMyCards(name, round, false, originalPlayerName);
  const playerInCharge = gameIsPlayed ? "" : starterOfThisPlay(round, playIndex);
  const cardInCharge = getCurrentCardInCharge(round.cardsPlayed);
  const myPlayedCard = round.cardsPlayed[playIndex].find(playedCard => playedCard.name === name || playedCard.name === originalPlayerName)?.card;

  return {
    cardsInRound: round.cardsInRound,
    dealerPositionIndex: round.dealerPositionIndex,
    starterPositionIndex: round.starterPositionIndex,
    myCards: myCards, // TODO speed promise
    playableCards: isNowMyTurn ? getPlayableCardIndexes(myCards, round, playIndex) : [],
    players: getRoundPlayers(name, round, playIndex, !isRuleActive(gameInDb, RULE.hiddenPromiseRound), originalPlayerName), // TODO showPromisesNow
    trumpCard: ICardToIuiCard(round.trumpCard), // TODO hidden trump mode
    myPlayedCard: myPlayedCard ? ICardToIuiCard(myPlayedCard) : null,
    playerInCharge: playerInCharge,
    cardInCharge: cardInCharge ? ICardToIuiCard(cardInCharge) : null, // TODO hidden cards
    playerGoingToWinThisPlay: winnerOfPlay(round.cardsPlayed[playIndex], round.trumpCard.suite)?.name, // TODO
    cardsPlayed: getCardsPlayed(round, playIndex), // TODO hidden cards
    gameOver: gameInDb.gameStatus === GAME_STATUS.played,
    whoseTurn: playerInTurn?.name ?? "",
    isMyTurn: isNowMyTurn, // TODO
    isMyPromiseTurn: isMyPromiseTurn(name, round, originalPlayerName), // TODO ?
    handValues: null, // TODO getHandValues(thisGame, roundInd),
    obsGame: null, // TODO obsGameToRoundObj
    promiseTable: getPromiseTable(gameInDb),
    roundPhase: getRoundPhase(round),
  } as IuiRoundToPlayer;
};

/**
 *
 * @param rounds array of game rounds
 * @returns index of ongoing round or null
 */
const getCurrentRound = (rounds: IRound[]): number | null => {
  return rounds.find(round => round.roundStatus === ROUND_STATUS.onGoing)?.roundIndex ?? null;
};

const gameToGameInfo = (gameIdStr: string, gameInDb: IGameOptions): IuiGetGameInfoResponse => {
  return {
    gameId: gameIdStr,
    humanPlayersCount: gameInDb.humanPlayersCount,
    computerPlayersCount: gameInDb.botPlayersCount,
    humanPlayers: gameInDb.humanPlayers.map(player => {
      return {
        name: player.name,
        type: "human",
        playerStats: parsePlayerStats(gameInDb, player.name),
        playedBy: player.playedBy,
      } as IuiParsedHumanPlayer;
    }), // TODO
    hasPassword: gameInDb.password.length > 0,
    currentRound: getCurrentRound(gameInDb.game.rounds),
    reloaded: false, // TODO
    eventInfo: false, // TODO
    thisIsDemoGame: gameInDb.thisIsDemoGame,
    rules: rulesToRuleObj(gameInDb),
  } as IuiGetGameInfoResponse;
};

export const makePromise = async (makePromiseRequest: IuiMakePromiseRequest): Promise<IuiMakePromiseResponse> => {
  const promiseResponse = await makePromiseToPlayer(makePromiseRequest);
  return promiseResponse;
};

export const playCard = async (playCardRequest: IuiPlayCardRequest): Promise<IuiPlayCardResponse> => {
  const playCardResponse = await playerPlaysCard(playCardRequest);
  return playCardResponse;
};
