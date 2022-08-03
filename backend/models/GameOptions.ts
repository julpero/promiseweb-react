import { model, Schema } from "mongoose";
import { IGameOptions } from "../../frontend/src/interfaces/IGameOptions"
import HumanPlayer from "./HumanPlayer";
import Game from "./Game";

import { PROMISEWEBCOLLECTION } from "./Collections";

const gameOptionsSchema: Schema = new Schema({
  humanPlayersCount: {type: Number, required: true},
  botPlayersCount: {type: Number, required: true},
  startRound: {type: Number, required: true},
  turnRound: {type: Number, required: true},
  endRound: {type: Number, required: true},
  adminName: {type: String, required: true},
  password: {type: String, required: false},
  gameStatus: {type: Number, required: true},
  humanPlayers: [HumanPlayer],
  createDateTime: {type: Date, required: true},
  evenPromisesAllowed: {type: Boolean, required: false},
  visiblePromiseRound: {type: Boolean, required: false},
  onlyTotalPromise: {type: Boolean, required: false},
  freeTrump: {type: Boolean, required: false},
  hiddenTrump: {type: Boolean, required: false},
  speedPromise: {type: Boolean, required: false},
  privateSpeedGame: {type: Boolean, required: false},
  opponentPromiseCardValue: {type: Boolean, required: false},
  opponentGameCardValue: {type: Boolean, required: false},
  thisIsDemoGame: {type: Boolean, required: false},
  hiddenCardsMode: {type: Number, required: false},
  game: {type: Game, required: false},
  gameStarted: {type: Date, required: false},
  gameStatistics: [],
  lastUpdate: {type: Date, required: false},
}, {
  collection: PROMISEWEBCOLLECTION,
  timestamps: true,
});

export default model<IGameOptions>("GameOptions", gameOptionsSchema);
