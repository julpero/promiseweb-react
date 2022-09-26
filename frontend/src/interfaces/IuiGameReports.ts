import { IuiAuth } from "./IuiUser";

export interface IuiPlayersInGameReport {
  playersInGame: number,
  count: number,
}

export interface IuiGamesByPlayer {
  playerName: string,
  count: number, // mostGamesPlayed
  wins: number, // playerTotalWins
  avgPoints: number, // avgPointsPerPlayer
  avgScorePoints: number, // avgScorePointsPerPlayer
  avgKeepPercentage: number, // avgKeepPercentagePerPlayer
  totalPoints: number, // totalPointsPerPlayer
  winPercentage: number, // playerWinPercentage
  avgPercentagePoints: number, // avgPercentagePoints
}

export interface IuiPlayedGamesReport extends IuiAuth {
  gamesPlayed: number,
  roundsPlayed: number,
  totalCardsHit: number,
  playersTotal: IuiPlayersInGameReport[],
  gamesByPlayer: IuiGamesByPlayer[],
  // avgZerosPerPlayer: null,
  // avgKeepsPerPlayer: null, this is obsolete
  // vanillaGamesCount: number,
  // usedRulesCount: null,
  playerCount: number,
  // meltingGame: null,
  // spurtingGame: null,
  // cardsInHandCount: null,
  // timesUsed: null,
}
