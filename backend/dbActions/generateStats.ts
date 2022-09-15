import { ICardPlayed } from "../interfaces/IGameOptions";

export const countPlayTime = (cardsPlayed: ICardPlayed[][], playerInRound: string): number => {
  let playTime = 0;
  cardsPlayed.forEach(play => {
    play.filter(playByName => playByName.name === playerInRound).forEach(playersPlay => {
      playTime+= playersPlay.playedTime - playersPlay.playStarted;
    });
  });
  return playTime;
};
