import { ROUND_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";
import { getPlayerAvgPoints } from "../dbActions/promiseweb";
import { IGame, IGameOptions, IHumanPlayer, IPlayer, IPlayerStats, IPromiser, IRound } from "../interfaces/IGameOptions";

export const getPlayerStats = async (roundCount: number, playerName: string): Promise<IPlayerStats> => {
  const statsGamesObj = {
    playerAvgPointsInRounds: await getPlayerAvgPoints(playerName, roundCount)
  };
  return statsGamesObj;
};

export const getGameRoundCount = (gameInDb: IGameOptions): number => {
  return (gameInDb.startRound-gameInDb.turnRound+1)+(gameInDb.endRound-gameInDb.turnRound);
};

export const getPlayerNameInPlayerOrder = (player: IPlayer | string): string => {
  if (typeof player === "string") {
    return player;
  } else {
    return player.name;
  }
};

export const getPlayerIdInPlayerOrder = (player: IPlayer | string): string => {
  if (typeof player === "string") {
    return ""; // this should be obsolete now
  } else {
    return player.playerId;
  }
};

export const getPlayerNameById = (players: IHumanPlayer[], playerId: string): string => {
  return players.find(player => player.playerId == playerId)?.name ?? "";
};

export const getCurrentRoundInd = (game: IGame): number => {
  return game.rounds.find(round => round.roundStatus === ROUND_STATUS.OnGoing)?.roundIndex ?? -1;
};

export const getPromiser = (round: IRound): IPromiser | null => {
  if (round.roundPlayers.some(player => player.promise === null)) {
    const playerCount = round.roundPlayers.length;
    const { starterPositionIndex } = round;
    for (let i = starterPositionIndex; i < starterPositionIndex + playerCount; i++) {
      const checkInd = i >= playerCount ? i - playerCount : i;
      if (round.roundPlayers[checkInd].promise === null) {
        return {
          name: round.roundPlayers[checkInd].name,
          type: round.roundPlayers[checkInd].type,
          playerId: round.roundPlayers[checkInd].playerId,
          index: checkInd,
        } as IPromiser;
      }
    }
  }
  return null;
};

export const isRoundsLastPromiser = (round: IRound): boolean => {
  return round.roundPlayers.length - round.roundPlayers.filter(player => player.promise !== null).length === 1;
};

export const getCurrentPromiseTotal = (round: IRound): number => {
  let totalPromise = 0;
  round.roundPlayers.map(player => totalPromise+=(player.promise ?? 0));
  return totalPromise;
};
