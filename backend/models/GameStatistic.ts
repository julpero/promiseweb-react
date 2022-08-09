import { model, Schema } from "mongoose";
import { IGameStatistics } from "../interfaces/IGameOptions";
import PlayerStatistic from "./PlayerStatistic";

const spurtAndMeltSchema: Schema = new Schema({
  spurtGap: {type: Number, required: true},
  spurtFrom: {type: Number, required: true},
  meltGap: {type: Number, required: true},
  meltFrom: {type: Number, required: true},
  melter: {type: String, required: true},
});

const gameStatisticsSchema: Schema = new Schema({
  generated: {type: Number, required: true},
  playersStatistics: [PlayerStatistic],
  winnerName: {type: String, required: true},
  winnerPoints: {type: Number, required: true},
  roundsPlayed: {type: Number, required: true},
  bigRoundsPlayed: {type: Number, required: true},
  smallRoundsPlayed: {type: Number, required: true},
  cardsHit: {type: Number, required: true},
  spurtAndMelt: spurtAndMeltSchema,
});

export default model<IGameStatistics>("GameStatistics", gameStatisticsSchema);
