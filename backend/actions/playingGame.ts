import { IGetRoundRequest, IGetRoundResponse, IRoundToPlayer } from "../../frontend/src/interfaces/IPlayingGame";
import { getGame } from "../dbActions/playingGame";

export const getRound = async (getRoundObj: IGetRoundRequest): Promise<IGetRoundResponse | null> => {
  const gameInDb = await getGame(getRoundObj.gameId);

  if (!gameInDb || !gameInDb.humanPlayers.find(player => player.playerId === getRoundObj.myId)) {
    return null;
  }

  const roundResponse: IGetRoundResponse = {
    gameId: getRoundObj.gameId,
  };
  return roundResponse;
};

const roundToPlayer = (): IRoundToPlayer => {
  return {

  } as IRoundToPlayer;
};
