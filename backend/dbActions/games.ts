import GameOptions from "../models/GameOptions";
import { IGameStatistics, IHumanPlayer } from "../interfaces/IGameOptions";
import { GAME_STATUS, HIDDEN_CARDS_MODE } from "../../frontend/src/interfaces/IuiGameOptions";

export interface IGameForList {
  id: string,
  createDateTime: Date,
  humanPlayersCount: number,
  gameStatistics?: IGameStatistics,
  humanPlayers: IHumanPlayer[],
  // rules:
  startRound: number,
  turnRound: number,
  endRound: number,
  password: string,
  evenPromisesAllowed: boolean,
  visiblePromiseRound: boolean,
  onlyTotalPromise: boolean,
  freeTrump: boolean,
  hiddenTrump: boolean,
  speedPromise: boolean,
  privateSpeedGame: boolean,
  opponentPromiseCardValue: boolean,
  opponentGameCardValue: boolean,
  thisIsDemoGame: boolean,
  hiddenCardsMode: HIDDEN_CARDS_MODE,
}

export const getGamesByStatus = async (gameStatus: GAME_STATUS): Promise<IGameForList[]> => {
  console.time("getGamesByStatus");
  const games = await GameOptions.find(
    {
      gameStatus: gameStatus,
    }
  ).select({
    _id: 1,
    createDateTime: 1,
    humanPlayersCount: 1,
    gameStatistics: 1,
    humanPlayers: 1,
    startRound: 1,
    turnRound: 1,
    endRound: 1,
    password: 1,
    evenPromisesAllowed: 1,
    visiblePromiseRound: 1,
    onlyTotalPromise: 1,
    freeTrump: 1,
    hiddenTrump: 1,
    speedPromise: 1,
    privateSpeedGame: 1,
    opponentPromiseCardValue: 1,
    opponentGameCardValue: 1,
    thisIsDemoGame: 1,
    hiddenCardsMode: 1,
  }).lean();
  console.timeEnd("getGamesByStatus");

  const gameList: IGameForList[] = games.map((game) => {
    return({
      ...game,
      id: game._id.toString(),
    });
  });

  // console.log("gameList", gameList);
  return gameList;
};
