import { model, Schema } from "mongoose";
import { IRoundOfPlayerStats } from "../interfaces/IStats";

import { STATS_COLLECTION } from "./Collections";

const statsSchema: Schema = new Schema({
  game: {type: String, required: true},
  playersInGame: {type: Number, required: true},
  played: {type: Number, required: true},
  round: {type: Number, required: true},
  cardsInRound: {type: Number, required: true},
  name: {type: String, required: true},
  promise: {type: Number, required: true},
  keeps: {type: Number, required: true},
  points: {type: Number, required: true},
  kept: {type: Boolean, required: true},
  promiseTime: {type: Number, required: true},
  playTime: {type: Number, required: true},
}, {
  collection: STATS_COLLECTION,
  timestamps: true,
});

export default model<IRoundOfPlayerStats>("StatsToPlayer", statsSchema);
