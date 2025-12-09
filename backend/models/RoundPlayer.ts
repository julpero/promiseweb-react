import { Schema } from "mongoose";
import { IRoundPlayer } from "../interfaces/IGameOptions";
import cardSchema from "./Card";

const roundPlayerSchema = new Schema<IRoundPlayer>({
  name: {type: String, required: true},
  cards: [cardSchema],
  promise: {type: Number, required: false},
  promiseStarted: {type: Number, required: false},
  promiseMade: {type: Number, required: false},
  rePromise: {type: Number, required: false},
  rePromiseStarted: {type: Number, required: false},
  rePromiseMade: {type: Number, required: false},
  keeps: {type: Number, required: false},
  points: {type: Number, required: false},
  cardsToDebug: [cardSchema],
  type: {type: String, required: true},
  speedPromisePoints: {type: Number, required: false},
  speedPromiseTotal: {type: Number, required: false},
  evenBreakingBonus: {type: Number, required: false},
});

export default roundPlayerSchema;
