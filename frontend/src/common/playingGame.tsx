import { IuiGetRoundResponse, IuiRoundPlayer } from "../interfaces/IuiPlayingGame";

export const currentTotalPromise = (players: IuiRoundPlayer[]): number => {
  let total = 0;
  players.map(player => total+= player.promise ?? 0);
  return total;
};

const getMyPosition = (round: IuiGetRoundResponse): number => {
  return round.roundToPlayer.players.findIndex(player => player.thisIsMe);
};

export const playerFromIndex = (round: IuiGetRoundResponse, index: number, asAObserver: boolean): IuiRoundPlayer => {
  const myPosition = asAObserver ? 0 : getMyPosition(round);
  const playerCount = round.roundToPlayer.players.length;
  let retIndex = myPosition + index;
  if (retIndex >= playerCount) retIndex = retIndex - playerCount;
  return round.roundToPlayer.players[retIndex];
};
