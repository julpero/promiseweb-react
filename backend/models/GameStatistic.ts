import { Schema } from "mongoose";
import { IGameStatistics, ISpurtAndMelt } from "../interfaces/IGameOptions";
import PlayerStatistic from "./PlayerStatistic";

const spurtAndMeltSchema: Schema = new Schema<ISpurtAndMelt>({
  spurtGap: {type: Number, required: false},
  spurtFrom: {type: Number, required: false},
  meltGap: {type: Number, required: false},
  meltFrom: {type: Number, required: false},
  melter: {type: String, required: false},
});

const gameStatisticsSchema: Schema = new Schema<IGameStatistics>({
  generated: {type: Number, required: true},
  playersStatistics: [PlayerStatistic],
  winnerName: {type: String, required: false},
  winnerPoints: {type: Number, required: true},
  roundsPlayed: {type: Number, required: true},
  bigRoundsPlayed: {type: Number, required: true},
  smallRoundsPlayed: {type: Number, required: true},
  cardsHit: {type: Number, required: true},
  spurtAndMelt: spurtAndMeltSchema,
});

export default gameStatisticsSchema;
