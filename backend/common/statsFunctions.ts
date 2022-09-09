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
    smallNotZeroFailPromisesCount: 0,
    totalPointsBig: 0,
    totalPointsSmall: 0,
    totalKeepsBig: 0,
    totalKeepsSmall: 0,
  };

  game.rounds.filter(round => round.roundStatus !== ROUND_STATUS.initialized).forEach(function(round) {
    const roundInfo = getPlayerRoundInfoForStats(round.roundPlayers, playerName);
    const roundKept = roundInfo.keeps === roundInfo.promise;
    if (roundKept) gameInfo.totalKeeps++;
    if (round.cardsInRound > 5) {
      gameInfo.totalPointsBig+= roundInfo.points;
      if (roundKept) gameInfo.totalKeepsBig++;
      if (roundInfo.promise === 0) {
        if (roundKept) {
          gameInfo.bigZeroKeepPromisesCount++;
          gameInfo.bigPointsByZero+= roundInfo.points;
        } else {
          gameInfo.bigZeroFailPromisesCount++;
        }
      }
    } else {
      gameInfo.totalPointsSmall+= roundInfo.points;
      if (roundKept) gameInfo.totalKeepsSmall++;
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

const countHandCardsByTypes = (rounds: IRound[], playerName: string): IGameHandCardsForStats => {
  const handCards: IGameHandCardsForStats = {
    trumpsInGame: 0,
    bigsCardsInGame: 0,
    smallCardsInGame: 0,
    otherCardsInGame: 0,
  };

  rounds.forEach(round => {
    const trumpSuite = round.trumpCard.suite;
    const playerInRound = round.roundPlayers.find(player => player.name === playerName);
    if (playerInRound) {
      const trumps = playerInRound.cardsToDebug.filter(card => card.suite === trumpSuite).length;
      const bigCards = playerInRound.cardsToDebug.filter(card => card.suite !== trumpSuite && card.value > 10).length;
      const smallCards = playerInRound.cardsToDebug.filter(card => card.suite !== trumpSuite && card.value < 6).length;
      const otherCards = round.cardsInRound - trumps - bigCards - smallCards;
      handCards.trumpsInGame+= trumps;
      handCards.bigsCardsInGame+= bigCards;
      handCards.smallCardsInGame+= smallCards;
      handCards.otherCardsInGame+= otherCards;
    }
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

const countTotalPromiseTime = (rounds: IRound[], playerName: string): number => {
  let totalPromiseTime = 0;
  rounds.forEach(round => {
    const player = round.roundPlayers.find(player => player.name === playerName);
    if (player && player.promiseMade && player.promiseStarted) {
      totalPromiseTime+= player.promiseMade - player.promiseStarted;
    }
  });
  return totalPromiseTime;
};

const playerPointsByRounds = (rounds: IRound[], playerName: string): number[] => {
  const pointsArr: number[] = [0];
  rounds.forEach(round => {
    pointsArr.push(round.roundPlayers.find(player => player.name === playerName)?.points ?? 0);
  });
  return pointsArr;
};

const playerCumulativePointsByRounds = (rounds: IRound[], playerName: string): number[] => {
  const cumulativePointsArr: number[] = [0];
  let cumulativeValue = 0;
  rounds.forEach(round => {
    cumulativeValue+= round.roundPlayers.find(player => player.name === playerName)?.points ?? 0;
    cumulativePointsArr.push(cumulativeValue);
  });
  return cumulativePointsArr;
};

const getPlayerStatistics = (game: IGame): IPlayerStatistic[] => {
  const players: IPlayerStatistic[] = [];
  game.playerOrder.forEach(function (player) {
    const playerName = getPlayerNameInPlayerOrder(player);
    const totalPoints = getGamePointsForPlayer(game.rounds, playerName);
    const gameInfo = getPlayerGameInfoForStats(game, playerName);
    const pointsPerKeeps = gameInfo.totalKeeps == 0 ? 0 : totalPoints/gameInfo.totalKeeps;
    const cards = countHandCardsByTypes(game.rounds, playerName);
    players.push({
      playerName: playerName,
      totalPoints: totalPoints,
      totalKeeps: gameInfo.totalKeeps,
      totalPointsBig: gameInfo.totalPointsBig,
      totalPointsSmall: gameInfo.totalPointsSmall,
      totalKeepsBig: gameInfo.totalKeepsBig,
      totalKeepsSmall: gameInfo.totalKeepsSmall,
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
      promiseTime: countTotalPromiseTime(game.rounds, playerName),
      pointsPerRound: playerPointsByRounds(game.rounds, playerName),
      cumulativePointsPerRound: playerCumulativePointsByRounds(game.rounds, playerName),
    } as IPlayerStatistic);
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

/**
 * This is called after every card hit.
 * If game ends, we will count more statistics.
 * This method can use only the game property.
 * @param game
 * @param gameIsPlayed
 * @returns IGameStatistics which can be saved to gameStatistics
 */
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
    // const roundStats = getGameReport(game, playersStatistics);
    // const winnerName = playersStatistics[0].playerName;
    const winnerCumulativePoints = playersStatistics[0].cumulativePointsPerRound;

    let maxSpurt = 0;
    let spurtFrom = 0;
    let maxMelt = 0;
    let meltFrom = 0;
    let melter = "";
    let winnerSpurted = 0;

    for (let i = 1; i < playersStatistics.length; i++) {
      const playerStatistics = playersStatistics[i];
      let playersMaxMelt = 0;
      playerStatistics.cumulativePointsPerRound.forEach((points, idx) => {
        playersMaxMelt = Math.max(playersMaxMelt, points - winnerCumulativePoints[idx]);
        winnerSpurted = Math.max(winnerSpurted, points - winnerCumulativePoints[idx]);
        if (playersMaxMelt > maxMelt) {
          maxMelt = playersMaxMelt;
          melter = playerStatistics.playerName;
          meltFrom = idx;
        }
        if (winnerSpurted > maxSpurt) {
          maxSpurt = winnerSpurted;
          spurtFrom = idx;
        }
      });
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

  const gameStats: IGameStatistics = {
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
  return gameStats;
};
