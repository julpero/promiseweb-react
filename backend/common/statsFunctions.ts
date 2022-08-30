import { ROUND_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";
import { countPlayTime } from "../dbActions/generateStats";
import { IGame, IGameHandCardsForStats, IGameInfoForStats, IGameStatistics, IPlayerStatistic, IRound, IRoundPlayer, ISpurtAndMelt } from "../interfaces/IGameOptions";
import { getPlayerNameInPlayerOrder } from "./common";
import { getGameReport } from "./reportFunctions";

interface IPlayedRoundTypes {
  bigRounds: number,
  smallRounds: number,
}

const getGamePointsForPlayer = (rounds: IRound[], playerName: string): number => {
  let points = 0;
  rounds.forEach(round => {
    points+= round.roundPlayers.find(player => player.name === playerName)?.points ?? 0;
  });
  return points;
};

const getPlayerRoundInfoForStats = (roundPlayers: IRoundPlayer[], playerName: string) => {
  const roundInfo = {
    keeps: 0,
    promise: 0,
    points: 0
  };
  const playerRoundInfo = roundPlayers.find(roundPlayer => roundPlayer.name === playerName);
  if (playerRoundInfo) {
    roundInfo.keeps = playerRoundInfo.keeps;
    roundInfo.promise = playerRoundInfo.promise ?? 0;
    roundInfo.points = playerRoundInfo.points ?? 0;
  }
  return roundInfo;
};

const getPlayerGameInfoForStats = (game: IGame, playerName: string): IGameInfoForStats => {
  const gameInfo: IGameInfoForStats = {
    totalKeeps: 0,
    bigPointsByZero: 0,
    bigZeroKeepPromisesCount: 0,
    bigZeroFailPromisesCount: 0,
    smallPointsNotZero: 0,
    smallNotZeroKeepPromisesCount: 0,
    smallNotZeroFailPromisesCount: 0
  };

  game.rounds.filter(round => round.roundStatus !== ROUND_STATUS.initialized).forEach(function(round) {
    const roundInfo = getPlayerRoundInfoForStats(round.roundPlayers, playerName);
    const roundKept = roundInfo.keeps === roundInfo.promise;
    if (roundKept) gameInfo.totalKeeps++;
    if (round.cardsInRound > 5) {
      if (roundInfo.promise === 0) {
        if (roundKept) {
          gameInfo.bigZeroKeepPromisesCount++;
          gameInfo.bigPointsByZero+= roundInfo.points;
        } else {
          gameInfo.bigZeroFailPromisesCount++;
        }
      }
    } else {
      if (roundInfo.promise > 0) {
        if (roundKept) {
          gameInfo.smallNotZeroKeepPromisesCount++;
          gameInfo.smallPointsNotZero+= roundInfo.points;
        } else {
          gameInfo.smallNotZeroFailPromisesCount++;
        }
      }
    }
  });
  return gameInfo;
};

const countHandCards = (rounds: IRound[], playerName: string): IGameHandCardsForStats => {
  const handCards: IGameHandCardsForStats = {
    trumpsInGame: 0,
    bigsCardsInGame: 0,
    smallCardsInGame: 0,
    otherCardsInGame: 0,
  };

  rounds.forEach(round => {
    const trumpSuit = round.trumpCard.suite;
    round.cardsPlayed.forEach(hitRound => {
      const playerCards = hitRound.find(hitCards => hitCards.name === playerName);
      if (playerCards) {
        if (playerCards.card.suite === trumpSuit) {
          handCards.trumpsInGame++;
        } else {
          if (playerCards.card.value > 10) {
            handCards.bigsCardsInGame++;
          } else if (playerCards.card.value < 6) {
            handCards.smallCardsInGame++;
          } else {
            handCards.otherCardsInGame++;
          }
        }
      }
    });
  });

  return handCards;
};

const countTotalPlayTime = (rounds: IRound[], playerName: string): number => {
  let totalPlayTime = 0;
  rounds.forEach(round => {
    totalPlayTime+= countPlayTime(round.cardsPlayed, playerName);
  });
  return totalPlayTime;
};

const getPlayerStatistics = (game: IGame): IPlayerStatistic[] => {
  const players: IPlayerStatistic[] = [];
  game.playerOrder.forEach(function (player) {
    const playerName = getPlayerNameInPlayerOrder(player);
    const totalPoints = getGamePointsForPlayer(game.rounds, playerName);
    const gameInfo = getPlayerGameInfoForStats(game, playerName);
    const pointsPerKeeps = gameInfo.totalKeeps == 0 ? 0 : totalPoints/gameInfo.totalKeeps;
    const cards = countHandCards(game.rounds, playerName);
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
      position: -1,
      scorePoints: -1,
      trumpsInGame: cards.trumpsInGame,
      bigsCardsInGame: cards.bigsCardsInGame,
      smallCardsInGame: cards.smallCardsInGame,
      otherCardsInGame: cards.otherCardsInGame,
      playTime: countTotalPlayTime(game.rounds, playerName),
    });
  });
  return players;
};

const sortPlayerStatistics = (a: IPlayerStatistic, b: IPlayerStatistic) => {
  if (a.totalPoints > b.totalPoints) return -1;
  if (a.totalPoints < b.totalPoints) return 1;
  if (a.totalPoints === b.totalPoints && a.totalKeeps > b.totalKeeps) return -1;
  if (a.totalPoints === b.totalPoints && a.totalKeeps < b.totalKeeps) return 1;
  if (a.totalPoints === b.totalPoints && a.totalKeeps === b.totalKeeps && a.playTime < b.playTime) return -1;
  if (a.totalPoints === b.totalPoints && a.totalKeeps === b.totalKeeps && a.playTime > b.playTime) return 1;
  return 0;
};

const getPlayedRoundTypes = (rounds: IRound[]): IPlayedRoundTypes => {
  const playedRounds = rounds.filter(round => round.roundStatus === ROUND_STATUS.played);
  const playedRoundTypes: IPlayedRoundTypes = {
    bigRounds: playedRounds.filter(round => round.cardsInRound > 5).length,
    smallRounds: playedRounds.filter(round => round.cardsInRound <= 5).length,
  };

  return playedRoundTypes;
};

const totalCardsHitInGame = (rounds: IRound[]): number => {
  let cardsHit = 0;
  const roundsWithHitCards = rounds.filter(round => round.roundStatus !== ROUND_STATUS.initialized);
  roundsWithHitCards.forEach(round => {
    round.cardsPlayed.forEach(cards => {
      cardsHit+= cards.length;
    });
  });
  return cardsHit;
};

export const generateGameStats = (game: IGame, gameIsPlayed: boolean): IGameStatistics => {

  const playersStatistics = getPlayerStatistics(game).sort(sortPlayerStatistics);
  for (let i = 0; i < playersStatistics.length; i++) {
    const position = i+1;
    playersStatistics[i].position = position;
    playersStatistics[i].scorePoints = (playersStatistics.length-position)/playersStatistics.length;
  }

  const spurtAndMelt: ISpurtAndMelt = {
    spurtGap: null,
    spurtFrom: null,
    meltGap: null,
    meltFrom: null,
    melter: null,
  };

  if (gameIsPlayed) {
    const roundStats = getGameReport(game, playersStatistics);
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
        if (roundStats.players[i] === winnerName) {
          winnerPoints = roundStats.points[i][j];
        } else {
          if (roundBest === null || roundStats.points[i][j] > roundBest) {
            roundBest = roundStats.points[i][j];
          }

          if (points1 === null) {
            points1 = roundStats.points[i][j];
            curMelter = roundStats.players[i];
          } else {
            if (roundStats.points[i][j] > points1) {
              points2 = points1;
              points1 = roundStats.points[i][j];
              curMelter = roundStats.players[i];
            } else if (points2 === null) {
              points2 = roundStats.points[i][j];
            } else if (roundStats.points[i][j] > points2) {
              points2 = roundStats.points[i][j];
            }
          }
        }
      }
      if (points1 !== null && points1 > winnerPoints) {
        const thisLead = points1 - Math.max(winnerPoints, points2 ?? 0);
        if (maxMelt <= thisLead) {
          maxMelt = thisLead;
          meltFrom = j;
          melter = curMelter;
        }
      }

      if (roundBest !== null) {
        const thisSpurt = roundBest - winnerPoints;
        if (winnerPoints < roundBest && thisSpurt >= maxSpurt) {
          maxSpurt = thisSpurt;
          spurtFrom = j;
        }
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

  const roundsPlayed: IPlayedRoundTypes = getPlayedRoundTypes(game.rounds);

  return {
    generated: Date.now(),
    playersStatistics: playersStatistics,
    winnerName: gameIsPlayed ? playersStatistics[0].playerName : "",
    winnerPoints: gameIsPlayed ? playersStatistics[0].totalPoints : 0,
    roundsPlayed: roundsPlayed.bigRounds + roundsPlayed.smallRounds,
    bigRoundsPlayed: roundsPlayed.bigRounds,
    smallRoundsPlayed: roundsPlayed.smallRounds,
    cardsHit: totalCardsHitInGame(game.rounds),
    spurtAndMelt: spurtAndMelt,
  };
};
