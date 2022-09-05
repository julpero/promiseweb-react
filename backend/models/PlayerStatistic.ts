import { Schema } from "mongoose";
import { IPlayerStatistic } from "../interfaces/IGameOptions";

const playerStatisticSchema: Schema = new Schema<IPlayerStatistic>({
  playerName: {type: String, required: true},
  totalPoints: {type: Number, required: true},
  totalKeeps: {type: Number, required: true},
  bigPointsByZero: {type: Number, required: true},
  bigZeroKeepPromisesCount: {type: Number, required: true},
  bigZeroFailPromisesCount: {type: Number, required: true},
  smallPointsNotZero: {type: Number, required: true},
  smallNotZeroKeepPromisesCount: {type: Number, required: true},
  smallNotZeroFailPromisesCount: {type: Number, required: true},
  pointsPerKeeps: {type: Number, required: true},
  position: {type: Number, required: true},
  scorePoints: {type: Number, required: true},
  trumpsInGame: {type: Number, required: true},
  bigsCardsInGame: {type: Number, required: true},
  smallCardsInGame: {type: Number, required: true},
  otherCardsInGame: {type: Number, required: true},
  playTime: {type: Number, required: false},
});

export default playerStatisticSchema;
