import { IGame, IPlayerStatistic } from "../interfaces/IGameOptions";
import { getPlayerNameInPlayerOrder } from "./common";
import { IGameReport } from "../../frontend/src/interfaces/IuiReports";

export const getGameReport = (game: IGame, playersStatistics: IPlayerStatistic[], onlyName: string): IGameReport => {
  const retObj: IGameReport = {
    players: [],
    points: [],
    rounds: [],
    pointsBig: [], // rounds of 6-10 cards
    pointsSmall: [], // rounds of 1-5 cards
    keepsBig: [], // rounds of 6-10 cards
    keepsSmall: [], // rounds of 1-5 cards
    trumps: [],
    bigCards: [],
    smallCards: [],
    otherCards: [],
  };

  const players: string[] = [];
  const startPointsArr: number[] = [0];
  const roundsArr: number[] = [0];
  const pointsBigArr: number[] = [];
  const pointsSmallArr: number[] = [];
  const keepsBigArr: number[] = [];
  const keepsSmallArr: number[] = [];
  const pointsArr: number[][] = [];
  const trumpsArr: number[] = [];
  const bigCardsArr: number[] = [];
  const smallCardsArr: number[] = [];
  const otherCardsArr: number[] = [];

  for (let i = 0; i < game.playerOrder.length; i++) {
    const playerName = getPlayerNameInPlayerOrder(game.playerOrder[i]);
    if (onlyName !== undefined && onlyName !== playerName) continue;
    players.push(playerName);
    startPointsArr.push(0);
    keepsBigArr.push(0);
    keepsSmallArr.push(0);
    const totalPointsByPlayer = [0];
    let pointsPerPlayer = 0;
    let bigPointsPerPlayer = 0;
    let smallPointsPerPlayer = 0;
    for (let j = 0; j < game.rounds.length; j++) {
      for (let k = 0; k < game.rounds[j].roundPlayers.length; k++) {
        if (game.rounds[j].roundPlayers[k].name == playerName) {
          const pointsFromRound = game.rounds[j].roundPlayers[k].points ?? 0;
          pointsPerPlayer+= pointsFromRound;
          totalPointsByPlayer.push(pointsPerPlayer);
          if (game.rounds[j].cardsInRound > 5) {
            bigPointsPerPlayer+= pointsFromRound;
          } else {
            smallPointsPerPlayer+= pointsFromRound;
          }
          break;
        }
      }
    }
    if (playersStatistics != null) {
      for (let j = 0; j < playersStatistics.length; j++) {
        if (playersStatistics[j].playerName == playerName) {
          trumpsArr.push(playersStatistics[j].trumpsInGame);
          bigCardsArr.push(playersStatistics[j].bigsCardsInGame);
          smallCardsArr.push(playersStatistics[j].smallCardsInGame);
          otherCardsArr.push(playersStatistics[j].otherCardsInGame);
          break;
        }
      }
    }
    pointsArr.push(totalPointsByPlayer);
    pointsBigArr.push(bigPointsPerPlayer);
    pointsSmallArr.push(smallPointsPerPlayer);
  }
  retObj.players = players;

  for (let i = 0; i < game.rounds.length; i++) {
    if (game.rounds[i].roundStatus != 2) break;
    roundsArr.push(i+1);
    for (let j = 0; j < game.rounds[i].roundPlayers.length; j++) {
      if (game.rounds[i].roundPlayers[j].promise == game.rounds[i].roundPlayers[j].keeps) {
        if (game.rounds[i].cardsInRound > 5) {
          if (retObj.smallStart != null && retObj.smallEnd == null) {
            retObj.smallEnd = i;
          }
          keepsBigArr[j]++;
        } else {
          if (retObj.smallStart == null) {
            retObj.smallStart = i;
          }
          keepsSmallArr[j]++;
        }
      }
    }
  }

  retObj.points = pointsArr;
  retObj.rounds = roundsArr;
  retObj.pointsBig = pointsBigArr;
  retObj.pointsSmall = pointsSmallArr;
  retObj.keepsBig = keepsBigArr;
  retObj.keepsSmall = keepsSmallArr;
  retObj.trumps = trumpsArr;
  retObj.bigCards = bigCardsArr;
  retObj.smallCards = smallCardsArr;
  retObj.otherCards = otherCardsArr;

  return retObj;
};
