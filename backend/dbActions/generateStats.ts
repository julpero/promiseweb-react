import { ICardPlayed, IRound, IRoundPlayer } from "../interfaces/IGameOptions";
import StatsToPlayer from "../models/RoundStats";
import { IRoundOfPlayerStats } from "../interfaces/IStats";

const countPlayTime = (cardsPlayed: ICardPlayed[][], playerInRound: string): number => {
  let playTime = 0;
  cardsPlayed.forEach(play => {
    play.filter(playByName => playByName.name === playerInRound).forEach(playersPlay => {
      playTime+= playersPlay.playedTime - playersPlay.playStarted;
    });
  });
  return playTime;
};

export const generateRoundStats = async (gameIdStr: string, round: IRound): Promise<boolean> => {
  let retVal = true;
  for (let i = 0; i < round.roundPlayers.length; i++) {
    const player: IRoundPlayer = round.roundPlayers[i];
    const statsPlayer: IRoundOfPlayerStats = {
      game: gameIdStr,
      played: Date.now(),
      round: round.roundIndex,
      name: player.name,
      promise: player.promise ?? 0,
      promiseTime: (player.promiseMade ?? 0) - (player.promiseStarted ?? 0),
      playTime: countPlayTime(round.cardsPlayed, player.name),
      keeps: player.keeps,
      points: player.points ?? 0,
      kept: player.promise === player.keeps,
      cardsInRound: round.cardsInRound,
      playersInGame: round.roundPlayers.length,
    };

    const newStats = new StatsToPlayer(statsPlayer);
    const insertedStatsRow = await newStats.save();
    console.log("insertedStatsRow", insertedStatsRow);

    if (!insertedStatsRow) {
      retVal = false;
    }
  }
  return retVal;
};
