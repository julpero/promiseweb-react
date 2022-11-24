import { HIDDEN_CARDS_MODE, RULE } from "./IuiGameOptions";
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

export interface IuiPlayedGame {
  gameId: string,
  humanPlayers: string[],
  played: Date,
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
  // usedRulesCount: Map<RULE | HIDDEN_CARDS_MODE, number>,
  usedRulesCount: string,
  hiddenCardsModeCount: string,
  playerCount: number,
  // meltingGame: null,
  // spurtingGame: null,
  // cardsInHandCount: null,
  // timesUsed: null,
  lastGames?: IuiPlayedGame[],
}
