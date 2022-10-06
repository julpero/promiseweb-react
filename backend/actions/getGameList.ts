import { IuiGameListItem, IuiGetGameListResponse } from "../../frontend/src/interfaces/IuiGameList";
import { IHumanPlayer } from "../interfaces/IGameOptions";
import { GAME_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";
import { getGamesByStatus, IGameForList } from "../dbActions/games";
import { playersToArr, rulesToRuleObj } from "../common/model";
import { IuiUserData } from "../../frontend/src/interfaces/IuiUser";

const playedByMap = (players: IHumanPlayer[]): string | undefined => {
  const retMap = new Map<string, string>();
  players.filter(player => player.playedBy).forEach(player => {
    retMap.set(player.name, player.playedBy ?? "");
  });
  return retMap.size > 0 ? JSON.stringify(Array.from(retMap)) : undefined;
};

export const getOpenGamesList = async (getGameListRequest: IuiUserData, gameStatus: GAME_STATUS): Promise<IuiGetGameListResponse> => {
  const response: IuiGetGameListResponse = {
    games: [],
  };
  const openGames: IGameForList[] = await getGamesByStatus(gameStatus);
  openGames.forEach(openGame => {
    // console.log("openGame", openGame);
    response.games.push({
      created: openGame.createDateTime,
      id: openGame.id,
      rules: rulesToRuleObj(openGame),
      humanPlayers: playersToArr(openGame.humanPlayers),
      imInTheGame: openGame.humanPlayers.some((player) => player.name === getGameListRequest.userName),
      playerCount: openGame.humanPlayersCount,
      gameHasPassword: openGame.password.length > 0,
      inActivePlayers: openGame.humanPlayers.filter(player => !player.active).map(player => player.name) ?? [],
      playedBy: playedByMap(openGame.humanPlayers),
    } as IuiGameListItem);
  });
  // console.log("response", response);
  return response;
};
