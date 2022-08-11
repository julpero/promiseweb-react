import { ROUND_STATUS, RULE } from "../../frontend/src/interfaces/IuiGameOptions";
import {
  IuiCard,
  IuiGetGameInfoRequest,
  IuiGetGameInfoResponse,
  IuiGetRoundRequest,
  IuiGetRoundResponse,
  IuiParsedHumanPlayer,
  IuiPlayerPromise,
  IuiPlayerStats,
  IuiPromiseTable,
  IuiRoundPlayer,
  IuiRoundToPlayer,
  IuiRoundTotalPromise,
} from "../../frontend/src/interfaces/IuiPlayingGame";
import { getPlayerNameById, getPlayerNameInPlayerOrder } from "../common/common";
import { isRuleActive, rulesToRuleObj } from "../common/model";
import { getGame, getGameWithPlayer } from "../dbActions/playingGame";
import { ICardPlayed, IGameOptions, IRound } from "../interfaces/IGameOptions";

export const getRound = async (getRoundObj: IuiGetRoundRequest): Promise<IuiGetRoundResponse | null> => {
  const {gameId, myId, round} = getRoundObj;
  const gameInDb = await getGame(gameId);

  if (!gameInDb || !gameInDb.humanPlayers.find(player => player.playerId === myId)) {
    return null;
  }

  const myName = getPlayerNameById(gameInDb.humanPlayers, myId);

  const roundResponse: IuiGetRoundResponse = {
    gameId: gameId,
    roundInd: round,
    myName: myName,
    roundToPlayer: roundToPlayer(gameInDb, round, myName),
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

const showSpeedPromiseCards = (): boolean => {
  return true;
};

const getMyCards = (myName: string, round: IRound, speedPromise: boolean): IuiCard[] => {
  if (!speedPromise || showSpeedPromiseCards()) {
    return round.roundPlayers.find(player => player.name === myName)?.cards.map(card => {
      return {
        suite: card.suite,
        value: card.value,
      } as IuiCard;
    }) ?? [];
  } else {
    return [];
  }
};

const getCurrentPlayIndex = (round: IRound): number => {
  return round.cardsPlayed.length - 1;
};

const getPlayerPlayedCard = (playerName: string, cardsPlayed: ICardPlayed[], returnCard: boolean): IuiCard | null => {
  const cardPlayed = cardsPlayed.find(cardPlayed => cardPlayed.name === playerName);
  if (cardPlayed) {
    return returnCard ? cardPlayed.card : { suite: "dummy", value: 0 } as IuiCard;
  }
  return null;
};

const getRoundPlayers = (myName: string, round: IRound, playIndex: number, showPromises: boolean): IuiRoundPlayer[] => {
  const players: IuiRoundPlayer[] = [];
  // TODO const firstPlayerInThePlay = getFirstPlayerInThePlay(round, play);
  // TODO const lastPlayerInThePlay = getLastPlayerInThePlay(round, play);

  round.roundPlayers.forEach((player, idx) => {
    const thisIsMe = player.name == myName;
    const returnCard = thisIsMe || true; // TODO || module.exports.okToReturnCard(hiddenCardsMode, player.name == firstPlayerInThePlay, player.name == lastPlayerInThePlay, player.name == playerGoingToWinThisPlay);
    players.push({
      thisIsMe: thisIsMe,
      dealer: round.dealerPositionIndex === idx,
      name: player.name,
      promise: showPromises || thisIsMe ? player.promise : (player.promise == null) ? null : -1,
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

const roundToPlayer = (gameInDb: IGameOptions, roundInd: number, playerName: string): IuiRoundToPlayer => {
  const round = gameInDb.game.rounds[roundInd];
  const playIndex = getCurrentPlayIndex(round);

  return {
    cardsInRound: round.cardsInRound,
    dealerPositionIndex: round.dealerPositionIndex,
    starterPositionIndex: round.starterPositionIndex,
    myCards: getMyCards(playerName, round, false), // TODO speed promise
    players: getRoundPlayers(playerName, round, playIndex, isRuleActive(gameInDb, RULE.hiddenPromiseRound)), // TODO showPromisesNow
    trumpCard: round.trumpCard, // TODO
    playerInCharge: 0, // TODO
    cardInCharge: null, // TODO
    playerGoingToWinThisPlay: null, // TODO
    cardsPlayed: [], // TODO
    doReloadInit: false, // TODO
    newRound: false, // TODO
    gameOver: false, // TODO
    handValues: null, // TODO getHandValues(thisGame, roundInd),
    obsGame: null, // TODO obsGameToRoundObj
    promiseTable: getPromiseTable(gameInDb),
  } as IuiRoundToPlayer;
};

/**
 *
 * @param rounds array of game rounds
 * @returns index of ongoing round or null
 */
const getCurrentRound = (rounds: IRound[]): number | null => {
  return rounds.find(round => round.roundStatus === ROUND_STATUS.OnGoing)?.roundIndex ?? null;
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
