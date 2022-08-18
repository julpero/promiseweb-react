import { ROUND_STATUS, RULE } from "../../frontend/src/interfaces/IuiGameOptions";
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
  getPlayerNameById,
  getPlayerNameInPlayerOrder,
  getPromiser,
} from "../common/common";
import { ICardToIuiCard, isRuleActive, rulesToRuleObj } from "../common/model";
import { getGame, getGameWithPlayer, makePromiseToPlayer, playerPlaysCard } from "../dbActions/playingGame";
import { ICardPlayed, IGameOptions, IRound } from "../interfaces/IGameOptions";

export const getRound = async (getRoundObj: IuiGetRoundRequest): Promise<IuiGetRoundResponse | null> => {
  const {gameId, myId, roundInd} = getRoundObj;
  const gameInDb = await getGame(gameId);

  if (!gameInDb || !gameInDb.humanPlayers.find(player => player.playerId === myId)) {
    return null;
  }

  const myName = getPlayerNameById(gameInDb.humanPlayers, myId);

  const roundResponse: IuiGetRoundResponse = {
    gameId: gameId,
    roundInd: roundInd,
    myName: myName,
    roundToPlayer: roundToPlayer(gameInDb, roundInd, myId),
  };
  return roundResponse;
};

export const getGameInfo = async (getGameInfoRequest: IuiGetGameInfoRequest): Promise<IuiGetGameInfoResponse | null> => {
  const gameId = getGameInfoRequest.gameId;
  const gameInDb = await getGameWithPlayer(gameId, getGameInfoRequest.myId);
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

const getPlayerPlayedCard = (playerId: string, cardsPlayed: ICardPlayed[], returnCard: boolean): IuiCard | null => {
  const cardPlayed = cardsPlayed.find(cardPlayed => cardPlayed.playerId === playerId);
  if (cardPlayed) {
    return returnCard ? cardPlayed.card : { suite: "dummy", value: 0, rank: "" } as IuiCard;
  }
  return null;
};

const getRoundPlayers = (myId: string, round: IRound, playIndex: number, showPromises: boolean): IuiRoundPlayer[] => {
  const players: IuiRoundPlayer[] = [];
  // TODO const firstPlayerInThePlay = getFirstPlayerInThePlay(round, play);
  // TODO const lastPlayerInThePlay = getLastPlayerInThePlay(round, play);

  round.roundPlayers.forEach((player, idx) => {
    const thisIsMe = player.playerId == myId;
    const returnCard = thisIsMe || true; // TODO || module.exports.okToReturnCard(hiddenCardsMode, player.name == firstPlayerInThePlay, player.name == lastPlayerInThePlay, player.name == playerGoingToWinThisPlay);
    players.push({
      thisIsMe: thisIsMe,
      dealer: round.dealerPositionIndex === idx,
      name: player.name,
      promise: showPromises || thisIsMe ? player.promise : (player.promise === null) ? null : -1,
      keeps: player.keeps,
      cardPlayed: getPlayerPlayedCard(player.playerId, round.cardsPlayed[playIndex], returnCard),
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
    players: game.playerOrder.map(player => getPlayerNameInPlayerOrder(player)),
    promisesByPlayers: getPromisesByPlayers(gameInDb),
    rounds: game.rounds.map(round => {
      return {
        cardsInRound: round.cardsInRound,
        totalPromise: round.totalPromise, // TODO showPromisesNow('total', thisGame, j)
      } as IuiRoundTotalPromise;
    }),
  } as IuiPromiseTable;
};

const isMyTurn = (myId: string, round: IRound): boolean => {
  return getPlayerInTurn(round)?.playerId === myId;
};

const isMyPromiseTurn = (myId: string, round: IRound): boolean => {
  return getPromiser(round)?.playerId === myId;
};

const getRoundPhase = (round: IRound): ROUND_PHASE => {
  const playerCount = round.roundPlayers.length;
  if (round.cardsPlayed.length === playerCount) return ROUND_PHASE.played;
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

const roundToPlayer = (gameInDb: IGameOptions, roundInd: number, playerId: string): IuiRoundToPlayer => {
  const round = gameInDb.game.rounds[roundInd];
  const playIndex = getCurrentPlayIndex(round);
  const isNowMyTurn = isMyTurn(playerId, round);
  const myCards = getMyCards(playerId, round, false);
  const cardInCharge = getCurrentCardInCharge(round.cardsPlayed);
  const myPlayedCard = round.cardsPlayed[playIndex].find(playedCard => playedCard.playerId === playerId)?.card;

  return {
    cardsInRound: round.cardsInRound,
    dealerPositionIndex: round.dealerPositionIndex,
    starterPositionIndex: round.starterPositionIndex,
    myCards: myCards, // TODO speed promise
    playableCards: isNowMyTurn ? getPlayableCardIndexes(myCards, round, playIndex) : [],
    players: getRoundPlayers(playerId, round, playIndex, !isRuleActive(gameInDb, RULE.hiddenPromiseRound)), // TODO showPromisesNow
    trumpCard: ICardToIuiCard(round.trumpCard), // TODO
    myPlayedCard: myPlayedCard ? ICardToIuiCard(myPlayedCard) : null,
    playerInCharge: 0, // TODO
    cardInCharge: cardInCharge ? ICardToIuiCard(cardInCharge) : null, // TODO
    playerGoingToWinThisPlay: null, // TODO
    cardsPlayed: getCardsPlayed(round, playIndex), // TODO
    doReloadInit: false, // TODO
    newRound: false, // TODO
    gameOver: false, // TODO
    isMyTurn: isNowMyTurn, // TODO
    isMyPromiseTurn: isMyPromiseTurn(playerId, round), // TODO
    handValues: null, // TODO getHandValues(thisGame, roundInd),
    obsGame: null, // TODO obsGameToRoundObj
    promiseTable: getPromiseTable(gameInDb),
    roundPhase: getRoundPhase(round), // TODO do i really need this?
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
