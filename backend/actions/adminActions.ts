import { IuiAdminGame, IuiGetGamesRequest, IuiGetGamesResponse, IuiReCreateGameStatisticsRequest } from "../../frontend/src/interfaces/IuiAdminOperations";
import { GAME_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";
import { LOGIN_RESPONSE } from "../../frontend/src/interfaces/IuiUser";
import { reCreateGameStatistic } from "../dbActions/adminOperations";
import { getGamesByStatus } from "../dbActions/games";
import { checkLogin } from "../dbActions/users";
import { ICheckLoginRequest } from "../interfaces/IUser";

const allowAdminActions = async (userName: string): Promise<boolean> => {
  const checkLoginRequest: ICheckLoginRequest = {
    userName: userName,
    userPass1: process.env.ADMIN_DUMMY_PASS ?? "zxcvbnmmnbvcxz",
    userPass2: "",
    needsToBeAdmin: true,
  };
  const checkLoginObj = await checkLogin(checkLoginRequest);
  return checkLoginObj.result === LOGIN_RESPONSE.justAdminCheck;
};

export const getGamesForAdmin = async (getGamesRequest: IuiGetGamesRequest): Promise<IuiGetGamesResponse> => {
  const response: IuiGetGamesResponse = {
    gameList: [],
  };
  if (await allowAdminActions(getGamesRequest.userName)) {
    const playedGames = await getGamesByStatus(GAME_STATUS.played);
    playedGames.forEach(playedGame => {
      response.gameList.push({
        gameId: playedGame.id,
        played: playedGame.createDateTime,
        players: playedGame.gameStatistics.playersStatistics.map(player => player.playerName),
        statsGenerated: playedGame.gameStatistics.generated,
      } as IuiAdminGame);
    });
  }
  return response;
};

export const reCreateGameStats = async (reCreateGameStatisticsRequest: IuiReCreateGameStatisticsRequest): Promise<boolean> => {
  const {userName, gameId} = reCreateGameStatisticsRequest;
  if (!await allowAdminActions(userName)) return false;
  return await reCreateGameStatistic(gameId);
};
