import { IuiAdminGame, IuiGetGamesResponse, IuiReCreateGameStatisticsRequest, IuiReNameNickRequest, RENAME_STATUS } from "../../frontend/src/interfaces/IuiAdminOperations";
import { GAME_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";
import { LOGIN_RESPONSE } from "../../frontend/src/interfaces/IuiUser";
import { addUsedRules, convertOldDataToNew, reCreateAllGamesStatistic, reCreateGameStatistic, reNameNickInGame } from "../dbActions/adminOperations";
import { getGamesByStatus } from "../dbActions/games";
import { getGameWithPlayer } from "../dbActions/playingGame";
import { checkLogin } from "../dbActions/users";
import { ICheckLoginRequest } from "../interfaces/IUser";

const allowAdminActions = async (userName: string): Promise<boolean> => {
  const checkLoginRequest: ICheckLoginRequest = {
    userName: userName,
    userPass1: process.env.ADMIN_DUMMY_PASS ?? "zxcvbnmmnbvcxz",
    userPass2: "",
    needsToBeAdmin: true,
    email: "",
  };
  const checkLoginObj = await checkLogin(checkLoginRequest);
  return checkLoginObj.result === LOGIN_RESPONSE.justAdminCheck;
};

export const getGamesForAdmin = async (adminUserName: string): Promise<IuiGetGamesResponse> => {
  const response: IuiGetGamesResponse = {
    gameList: [],
  };
  if (await allowAdminActions(adminUserName)) {
    const playedGames = await getGamesByStatus(GAME_STATUS.played);
    playedGames.forEach(playedGame => {
      response.gameList.push({
        gameId: playedGame.id,
        played: playedGame.createDateTime,
        players: playedGame.gameStatistics?.playersStatistics.map(player => player.playerName) ?? [],
        statsGenerated: playedGame.gameStatistics?.generated ?? 0,
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

export const reCreateAllGameStats = async (userName: string): Promise<boolean> => {
  if (!await allowAdminActions(userName)) return false;
  return await reCreateAllGamesStatistic();
};

export const convertOldData = async (userName: string): Promise<string[]> => {
  if (!await allowAdminActions(userName)) return [];
  return await convertOldDataToNew();
};

export const updateRulesFromOldData = async (userName: string): Promise<string[]> => {
  if (!await allowAdminActions(userName)) return [];
  return await addUsedRules();
};

export const reNameNick = async (reNameNickRequest: IuiReNameNickRequest): Promise<RENAME_STATUS> => {
  const {userName, gameId, currentNick, newNick} = reNameNickRequest;
  if (!await allowAdminActions(userName)) return RENAME_STATUS.notOk;

  const gameInDb = await getGameWithPlayer(gameId, currentNick);

  if (!gameInDb) {
    return RENAME_STATUS.notOk;
  }
  if (gameInDb.humanPlayers.some(player => player.name === newNick.trim())) {
    return RENAME_STATUS.nameExistsInGame;
  }

  const reNameOk = await reNameNickInGame(gameId, currentNick.trim(), newNick.trim());
  if (reNameOk) {
    return RENAME_STATUS.ok;
  }

  return RENAME_STATUS.notOk;
};
