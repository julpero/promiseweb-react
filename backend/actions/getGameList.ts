import { IuiGameListItem, IuiGetGameListRequest, IuiGetGameListResponse } from "../../frontend/src/interfaces/IuiGameList";
import { IGameOptions } from "../interfaces/IGameOptions";
import { GAME_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";
import { getGamesByStatus } from "../dbActions/games";
import { playersToArr, rulesToRuleObj } from "../common/model";

export const getOpenGamesList = async (getGameListRequest: IuiGetGameListRequest): Promise<IuiGetGameListResponse> => {
  const response: IuiGetGameListResponse = {
    games: [],
  };
  const openGames: (IGameOptions & {id: string})[] = await getGamesByStatus(GAME_STATUS.created);
  openGames.forEach(openGame => {
    // console.log("openGame", openGame);
    response.games.push({
      created: openGame.createDateTime,
      id: openGame.id,
      rules: rulesToRuleObj(openGame),
      humanPlayers: playersToArr(openGame.humanPlayers),
      imInTheGame: openGame.humanPlayers.filter((player) => player.playerId === getGameListRequest.myId).length !== 0,
      playerCount: openGame.humanPlayersCount,
      gameHasPassword: openGame.password.length > 0,
    } as IuiGameListItem);
  });
  // console.log("response", response);
  return response;
};
