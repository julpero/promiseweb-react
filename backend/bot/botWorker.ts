import {
  IuiGetRoundResponse,
  IuiPlayCardRequest,
} from "../../frontend/src/interfaces/IuiPlayingGame";

// This function runs in a separate thread
export default ( getRoundResponse : IuiGetRoundResponse): IuiPlayCardRequest => {
  // Heavy computation/AI logic here
  const playable = getRoundResponse.roundToPlayer.playableCards[0];

  return {
    userName: "botPlayer",
    uuid: "bot-uuid-1234",
    gameId: getRoundResponse.gameId,
    roundInd: getRoundResponse.roundInd,
    card: getRoundResponse.roundToPlayer.myCards[playable],
    isSpeedPlay: false,
  } as IuiPlayCardRequest;
};
