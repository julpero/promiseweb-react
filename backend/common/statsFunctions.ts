import { IGame, IPlayerStatistic, IRound } from "../interfaces/IGameOptions";
import { getPlayerNameInPlayerOrder } from "./common";

const getGamePointsForPlayer = (rounds: IRound[], playerName: string): number => {
  let points = 0;
  rounds.forEach(round => {
    points+= round.roundPlayers.find(player => player.name === playerName)?.points ?? 0;
  });
  return points;
};

const getPlayerStatistics = (game: IGame): IPlayerStatistic[] => {
  const players: IPlayerStatistic[] = [];
  game.playerOrder.forEach(function (player) {
    const playerName = getPlayerNameInPlayerOrder(player);
    const totalPoints = getGamePointsForPlayer(game.rounds, playerName);
    const gameInfo = getPlayerGameInfoForStats(game, playerName);
    const pointsPerKeeps = gameInfo.totalKeeps == 0 ? 0 : totalPoints/gameInfo.totalKeeps;
    const cards = countHandCards(game, playerName);
    players.push({
      playerName: playerName,
      totalPoints: totalPoints,
      totalKeeps: gameInfo.totalKeeps,
      bigPointsByZero: gameInfo.bigPointsByZero,
      bigZeroKeepPromisesCount: gameInfo.bigZeroKeepPromisesCount,
      bigZeroFailPromisesCount: gameInfo.bigZeroFailPromisesCount,
      smallPointsNotZero: gameInfo.smallPointsNotZero,
      smallNotZeroKeepPromisesCount: gameInfo.smallNotZeroKeepPromisesCount,
      smallNotZeroFailPromisesCount: gameInfo.smallNotZeroFailPromisesCount,
      pointsPerKeeps: pointsPerKeeps,
      position: null,
      scorePoints: null,
      trumpsInGame: cards.trumps,
      bigsCardsInGame: cards.bigCards,
      smallCardsInGame: cards.smallCards,
      otherCardsInGame: cards.otherCards,
    });
  });
  return players;
};

const sortPlayerStatistics = (a: IPlayerStatistic, b: IPlayerStatistic) => {
  if (a.totalPoints > b.totalPoints) return -1;
  if (a.totalPoints < b.totalPoints) return 1;
  if (a.totalPoints == b.totalPoints && a.totalKeeps > b.totalKeeps) return -1;
  if (a.totalPoints == b.totalPoints && a.totalKeeps < b.totalKeeps) return 1;
  return 0;
};

export const generateGameStats = (game: IGame, gameIsPlayed: boolean) => {

  const playersStatistics = getPlayerStatistics(game).sort(sortPlayerStatistics);
  for (let i = 0; i < playersStatistics.length; i++) {
    const position = i+1;
    playersStatistics[i].position = position;
    playersStatistics[i].scorePoints = (playersStatistics.length-position)/playersStatistics.length;
  }

  const spurtAndMelt = {
    spurtGap: null,
    spurtFrom: null,
    meltGap: null,
    meltFrom: null,
    melter: null,
  };

  if (gameIsPlayed) {
    const roundStats = this.getGameReport(game, playersStatistics);
    const winnerName = playersStatistics[0].playerName;

    let maxSpurt = 0;
    let spurtFrom = 0;
    let maxMelt = 0;
    let meltFrom = 0;
    let melter = "";
    for (let j = 0; j < roundStats.points[0].length; j++) {
      let winnerPoints = 0;
      let roundBest = null;
      let points1 = null;
      let points2 = null;
      let curMelter = "";
      for (let i = 0; i < roundStats.points.length; i++) {
        if (roundStats.players[i] == winnerName) {
          winnerPoints = roundStats.points[i][j];
        } else {
          if (roundBest == null || roundStats.points[i][j] > roundBest) {
            roundBest = roundStats.points[i][j];
          }

          if (points1 == null) {
            points1 = roundStats.points[i][j];
            curMelter = roundStats.players[i];
          } else {
            if (roundStats.points[i][j] > points1) {
              points2 = points1;
              points1 = roundStats.points[i][j];
              curMelter = roundStats.players[i];
            } else if (points2 == null) {
              points2 = roundStats.points[i][j];
            } else if (roundStats.points[i][j] > points2) {
              points2 = roundStats.points[i][j];
            }
          }
        }
      }
      if (points1 > winnerPoints) {
        const thisLead = points1 - Math.max(winnerPoints, points2);
        if (maxMelt <= thisLead) {
          maxMelt = thisLead;
          meltFrom = j;
          melter = curMelter;
        }
      }

      const thisSpurt = roundBest - winnerPoints;
      if (winnerPoints < roundBest && thisSpurt >= maxSpurt) {
        maxSpurt = thisSpurt;
        spurtFrom = j;
      }
    }

    if (spurtFrom > 0) {
      spurtAndMelt.spurtGap = maxSpurt;
      spurtAndMelt.spurtFrom = spurtFrom;
      spurtAndMelt.meltGap = maxMelt;
      spurtAndMelt.meltFrom = meltFrom;
      spurtAndMelt.melter = melter;
    }
  }

  const roundsPlayed = getRoundsPlayed(game.rounds);

  return {
    generated: Date.now(),
    playersStatistics: playersStatistics,
    winnerName: gameIsPlayed ? playersStatistics[0].playerName : "",
    winnerPoints: gameIsPlayed ? playersStatistics[0].totalPoints : "",
    roundsPlayed: roundsPlayed.bigRounds + roundsPlayed.smallRounds,
    bigRoundsPlayed: roundsPlayed.bigRounds,
    smallRoundsPlayed: roundsPlayed.smallRounds,
    cardsHit: cardsHitInGame(game.rounds),
    spurtAndMelt: spurtAndMelt,
  };
};
