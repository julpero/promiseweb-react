import { IGameListItem, IGetGameListRequest, IGetGameListResponse } from "../../frontend/src/interfaces/IGameList";
import { IGameOptions } from "../interfaces/IGameOptions";
import { GAME_STATUS } from "../../frontend/src/interfaces/IGameOptions";
import { getGamesByStatus } from "../dbActions/games";
import { playersToArr, rulesToRuleObj } from "../common/model";

export const getOpenGamesList = async (getGameListRequest: IGetGameListRequest): Promise<IGetGameListResponse> => {
  const response: IGetGameListResponse = {
    games: [],
  };
  const openGames: (IGameOptions & {id: string})[] = await getGamesByStatus(GAME_STATUS.Created);
  openGames.forEach(openGame => {
    console.log("openGame type", typeof openGame);
    console.log("openGame", openGame);
    response.games.push({
      created: openGame.createDateTime,
      id: openGame.id,
      rules: rulesToRuleObj(openGame),
      humanPlayers: playersToArr(openGame.humanPlayers),
      imInTheGame: openGame.humanPlayers.filter((player) => player.playerId === getGameListRequest.myId).length !== 0,
      playerCount: openGame.humanPlayersCount,
      gameHasPassword: openGame.password.length > 0,
    } as IGameListItem);
  });
  console.log("response", response);
  return response;
};
