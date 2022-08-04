import { IGameListItem, IGetGameListRequest, IGetGameListResponse } from "../../frontend/src/interfaces/IGameList";
import { GAME_STATUS, IGameOptions } from "../interfaces/IGameOptions";
import { getGamesByStatus } from "../dbActions/games";
import { playersToArr, rulesToArr } from "../common/model";

export const getOpenGamesList = async (getGameListRequest: IGetGameListRequest): Promise<IGetGameListResponse> => {
  const response: IGetGameListResponse = {
    games: [],
  }
  const openGames: (IGameOptions & {id: string})[] = await getGamesByStatus(GAME_STATUS.Created);
  openGames.forEach(openGame => {
    console.log("openGame type", typeof openGame);
    console.log("openGame", openGame);
    response.games.push({
      id: openGame.id,
      rules: {
        ruleList: rulesToArr(openGame),
        hiddenCardsMode: openGame.hiddenCardsMode,
      },
      humanPlayers: playersToArr(openGame.humanPlayers),
      imInTheGame: openGame.humanPlayers.filter((player) => player.playerId === getGameListRequest.myId).length !== 0,
    } as IGameListItem);
  });
  console.log("response", response);
  return response;
}
