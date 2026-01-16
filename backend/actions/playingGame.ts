import { GAME_STATUS, ROUND_STATUS, RULE } from "../../frontend/src/interfaces/IuiGameOptions";
import {
  IuiCard,
  IuiCardPlayed,
  IuiGetGameInfoRequest,
  IuiGetGameInfoResponse,
  IuiGetRoundRequest,
  IuiGetRoundResponse,
  IuiHandValues,
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

export const getRound = async (getRoundObj: IuiGetRoundRequest, observerRequest?: boolean): Promise<IuiGetRoundResponse | null> => {
  const {gameId, userName, roundInd} = getRoundObj;
  const gameInDb = await getGame(gameId);

  if (!gameInDb || (!observerRequest && !gameInDb.humanPlayers.find(player => player.name === userName || player.playedBy === userName))) {
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

export const getGameInfo = async (getGameInfoRequest: IuiGetGameInfoRequest, observerRequest?: boolean): Promise<IuiGetGameInfoResponse | null> => {
  const {gameId, userName} = getGameInfoRequest;
  const gameInDb = observerRequest ? await getGame(gameId) : await getGameWithPlayer(gameId, userName);
  if (gameInDb) {
    return gameToGameInfo(gameId, gameInDb);
  } else {
    return null;
  }
};

const getHandValues = (round: IRound, roundPhase: ROUND_PHASE, visibleInPromise: boolean, visibleInPlay: boolean): IuiHandValues[] | null => {
  const showHandValue = ((visibleInPromise && roundPhase === ROUND_PHASE.onPromises) || (visibleInPlay && roundPhase === ROUND_PHASE.onPlay));

  if (showHandValue) {
    return round.roundPlayers.map(player => {
      return {
        name: player.name,
        value: player.cards.reduce((count, card) => {
          return count + card.value;
        }, 0),
      } as IuiHandValues;
    });
  }
  return null;
};

const parsePlayerStats = (gameInDb: IGameOptions, playerName: string): IuiPlayerStats => {
  return {
    playerAvgPointsInRounds: gameInDb.humanPlayers.find(player => player.name === playerName)?.playerStats?.playerAvgPointsInRounds ?? [],
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
      rePromise: showPromises || thisIsMe ? player.rePromise : (player.rePromise === null) ? null : -1,
      evenBreakingBonus: showPromises || thisIsMe ? player.evenBreakingBonus : null,
      keeps: player.keeps,
      cardPlayed: getPlayerPlayedCard(player.name, round.cardsPlayed[playIndex], returnCard),
      speedPromisePoints: player.speedPromisePoints,
      speedPromiseTotal: player.speedPromiseTotal,
    });

  });

  return players;
};

const showPlayerPromisesInRound = (round: IRound, hiddenPromiseRoundRule: boolean, onlyTotalPromiseRule: boolean): boolean => {
  // in this context we do not have re-promise
  switch (getRoundPhase(round, false)) {
    case ROUND_PHASE.initial: return false;
    case ROUND_PHASE.onPromises: return !hiddenPromiseRoundRule && !onlyTotalPromiseRule;
    case ROUND_PHASE.onPlay: return !onlyTotalPromiseRule;
    default: return true;
  }
};

const getPromisesByPlayers = (gameInDb: IGameOptions): IuiPlayerPromise[][] => {
  const game = gameInDb.game;
  const promisesByPlayers: IuiPlayerPromise[][] = [];

  const hiddenPromiseRoundRule = isRuleActive(gameInDb, RULE.hiddenPromiseRound);
  const onlyTotalPromiseRule = isRuleActive(gameInDb, RULE.onlyTotalPromise);

  for (let i = 0; i < game.playerOrder.length; i++) {
    const playerPromises: IuiPlayerPromise[] = [];
    for (let j = 0; j < game.rounds.length; j++) {
      const roundPlayer = game.rounds[j].roundPlayers[i];
      const showPromises = showPlayerPromisesInRound(game.rounds[j], hiddenPromiseRoundRule, onlyTotalPromiseRule);
      playerPromises.push({
        promise: showPromises ? roundPlayer.promise : null,
        keep: roundPlayer.keeps,
        points: roundPlayer.points,
        speedPromisePoints: roundPlayer.speedPromisePoints,
        speedPromiseTotal: roundPlayer.speedPromiseTotal,
        evenBreakingBonus: showPromises ? roundPlayer.evenBreakingBonus : null,
      } as IuiPlayerPromise);
    }
    promisesByPlayers.push(playerPromises);
  }
  return promisesByPlayers;
};

const showTotalPromisesInRound = (round: IRound, hiddenPromiseRoundRule: boolean, onlyTotalPromiseRule: boolean): boolean => {
  // in this context we do not have re-promise
  switch (getRoundPhase(round, false)) {
    case ROUND_PHASE.initial: return false;
    case ROUND_PHASE.onPromises: return !hiddenPromiseRoundRule && !onlyTotalPromiseRule;
    case ROUND_PHASE.onPlay: return true;
    default: return true;
  }
};

const getPromiseTable = (gameInDb: IGameOptions): IuiPromiseTable => {
  const game = gameInDb.game;

  const hiddenPromiseRoundRule = isRuleActive(gameInDb, RULE.hiddenPromiseRound);
  const onlyTotalPromiseRule = isRuleActive(gameInDb, RULE.onlyTotalPromise);

  return {
    players: game.playerOrder.map(player => player.name),
    promisesByPlayers: getPromisesByPlayers(gameInDb),
    rounds: game.rounds.map(round => {
      return {
        cardsInRound: round.cardsInRound,
        totalPromise: showTotalPromisesInRound(round, hiddenPromiseRoundRule, onlyTotalPromiseRule) ? round.totalPromise : null,
      } as IuiRoundTotalPromise;
    }),
  } as IuiPromiseTable;
};

const isMyPromiseTurn = (name: string, round: IRound, gameHasRePromiseRule: boolean, originalPlayerName?: string): boolean => {
  const promiser = getPromiser(round, gameHasRePromiseRule);
  if (promiser) {
    return promiser.name === name || promiser.name === originalPlayerName;
  } else {
    return false;
  }
};

export const getRoundPhase = (round: IRound, rePromiseIsInUse: boolean): ROUND_PHASE => {
  const cardsInRound = round.cardsInRound;
  const playerCount = round.roundPlayers.length;
  if (round.cardsPlayed.filter(play => play.length === playerCount).length === cardsInRound) return ROUND_PHASE.played;
  if (rePromiseIsInUse) {
    if (round.roundPlayers.filter(player => player.promise !== null && player.rePromise !== null).length === playerCount) return ROUND_PHASE.onPlay;
    if (round.roundPlayers.filter(player => player.promise !== null).length === playerCount && round.roundPlayers.filter(player => player.rePromise !== null).length !== playerCount) return ROUND_PHASE.onRePromises;
  } else {
    if (round.roundPlayers.filter(player => player.promise !== null).length === playerCount) return ROUND_PHASE.onPlay;
  }
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
  const gameHasRePromiseRule = isRuleActive(gameInDb, RULE.rePromise) || isRuleActive(gameInDb, RULE.hiddenRePromise);
  const roundPhase = getRoundPhase(round, gameHasRePromiseRule);
  const hiddenPromiseRoundRule = isRuleActive(gameInDb, RULE.hiddenPromiseRound);
  const onlyTotalPromiseRule = isRuleActive(gameInDb, RULE.onlyTotalPromise);

  return {
    cardsInRound: round.cardsInRound,
    dealerPositionIndex: round.dealerPositionIndex,
    starterPositionIndex: round.starterPositionIndex,
    myCards: myCards, // TODO speed promise
    playableCards: isNowMyTurn ? getPlayableCardIndexes(myCards, round, playIndex, isRuleActive(gameInDb, RULE.mustPlayTrump)) : [],
    players: getRoundPlayers(name, round, playIndex, showPlayerPromisesInRound(round, hiddenPromiseRoundRule, onlyTotalPromiseRule), originalPlayerName),
    trumpCard: isRuleActive(gameInDb, RULE.hiddenTrump) && (roundPhase === ROUND_PHASE.onPromises || roundPhase === ROUND_PHASE.onRePromises) ? null : ICardToIuiCard(round.trumpCard),
    myPlayedCard: myPlayedCard ? ICardToIuiCard(myPlayedCard) : null,
    playerInCharge: playerInCharge,
    cardInCharge: cardInCharge ? ICardToIuiCard(cardInCharge) : null, // TODO hidden cards
    playerGoingToWinThisPlay: winnerOfPlay(round.cardsPlayed[playIndex], round.trumpCard.suite)?.name, // TODO
    cardsPlayed: getCardsPlayed(round, playIndex), // TODO hidden cards
    gameOver: gameInDb.gameStatus === GAME_STATUS.played,
    whoseTurn: playerInTurn?.name ?? "",
    isMyTurn: isNowMyTurn,
    isMyPromiseTurn: isMyPromiseTurn(name, round, gameHasRePromiseRule, originalPlayerName),
    handValues: getHandValues(round, roundPhase, isRuleActive(gameInDb, RULE.opponentPromiseCardValue), isRuleActive(gameInDb, RULE.opponentGameCardValue)),
    obsGame: null, // TODO obsGameToRoundObj
    promiseTable: getPromiseTable(gameInDb),
    roundPhase: roundPhase,
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
    }),
    hasPassword: gameInDb.password.length > 0,
    currentRound: getCurrentRound(gameInDb.game.rounds),
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
