import { IGameOptions, IRound } from "../interfaces/IGameOptions";
import { IuiGameReport } from "../../frontend/src/interfaces/IuiReports";

const roundTypeAsStr = (rounds: IRound[]): string => {
  let retStr = "";
  const firstSmallIndex = rounds.findIndex(round => round.cardsInRound === 5);
  if (firstSmallIndex >= 0) {
    // started with big round
    retStr = `0;${firstSmallIndex};`;
  } else if (firstSmallIndex === 0) {
    retStr = `;${firstSmallIndex};`;
  } else {
    // no small rounds
    return "0;;";
  }

  for (let i = firstSmallIndex + 1; i < rounds.length; i++) {
    if (rounds[i].cardsInRound > 5) {
      return retStr+= i;
    }
  }
  return retStr;
};

/**
 * This method uses only games gameStatistics property.
 * If stats are not available re-create them with generateGameStats method.
 * @param gameInDb
 * @param onlyName
 * @returns IuiGameReport object
 */
export const getGameReport = (gameInDb: IGameOptions, onlyName?: string): IuiGameReport => {
  const {gameStatistics: gameStats} = gameInDb;
  const retObj: IuiGameReport = {
    players: [],
    pointsPerRound: [],
    cumulativePointsPerRound: [],
    rounds: [],
    pointsBig: [], // rounds of 6-10 cards
    pointsSmall: [], // rounds of 1-5 cards
    keepsBig: [], // rounds of 6-10 cards
    keepsSmall: [], // rounds of 1-5 cards
    trumps: [],
    bigCards: [],
    smallCards: [],
    otherCards: [],
    promiseTimes: [],
    playTimes: [],
    roundType: "",
  };

  if (!gameStats) return retObj;

  const players: string[] = [];
  const roundsArr: number[] = [];
  const pointsBigArr: number[] = [];
  const pointsSmallArr: number[] = [];
  const keepsBigArr: number[] = [];
  const keepsSmallArr: number[] = [];
  const pointsPerRoundArr: number[][] = [];
  const cumulativePointsPerRoundArr: number[][] = [];
  const trumpsArr: number[] = [];
  const bigCardsArr: number[] = [];
  const smallCardsArr: number[] = [];
  const otherCardsArr: number[] = [];
  const promiseTimesArr: number[] = [];
  const playTimesArr: number[] = [];

  for (let i = 0; i < gameInDb.game.playerOrder.length; i++) {
    const playerName = gameInDb.game.playerOrder[i].name;
    if (onlyName !== undefined && onlyName !== playerName) continue;

    players.push(playerName);
    const playerStats = gameStats.playersStatistics.find(playerStat => playerStat.playerName === playerName);
    if (playerStats) {
      pointsBigArr.push(playerStats.totalPointsBig);
      pointsSmallArr.push(playerStats.totalPointsSmall);
      keepsBigArr.push(playerStats.totalKeepsBig);
      keepsSmallArr.push(playerStats.totalKeepsSmall);
      pointsPerRoundArr.push([0, ...playerStats.pointsPerRound]);
      cumulativePointsPerRoundArr.push([0, ...playerStats.cumulativePointsPerRound]);
      trumpsArr.push(playerStats.trumpsInGame);
      bigCardsArr.push(playerStats.bigsCardsInGame);
      smallCardsArr.push(playerStats.smallCardsInGame);
      otherCardsArr.push(playerStats.otherCardsInGame);
      promiseTimesArr.push(playerStats.promiseTime);
      playTimesArr.push(playerStats.playTime);
    }
  }
  retObj.players = players;

  for (let i = 0; i <= gameStats.roundsPlayed; i++) roundsArr.push(i);

  retObj.pointsPerRound = pointsPerRoundArr;
  retObj.cumulativePointsPerRound = cumulativePointsPerRoundArr;
  retObj.rounds = roundsArr;
  retObj.pointsBig = pointsBigArr;
  retObj.pointsSmall = pointsSmallArr;
  retObj.keepsBig = keepsBigArr;
  retObj.keepsSmall = keepsSmallArr;
  retObj.trumps = trumpsArr;
  retObj.bigCards = bigCardsArr;
  retObj.smallCards = smallCardsArr;
  retObj.otherCards = otherCardsArr;
  retObj.promiseTimes = promiseTimesArr;
  retObj.playTimes = playTimesArr;
  retObj.roundType = roundTypeAsStr(gameInDb.game.rounds);

  return retObj;
};
