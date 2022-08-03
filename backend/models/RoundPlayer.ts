import { model, Schema } from "mongoose";
import { IRoundPlayer } from "../../frontend/src/interfaces/IGameOptions"
import Card from "./Card";

const roundPlayerSchema: Schema = new Schema({
  name: {type: String, required: true},
  cards: [Card],
  promise: {type: Number, required: false},
  promiseStarted: {type: Number, required: false},
  promiseMade: {type: Number, required: false},
  keeps: {type: Number, required: false},
  points: {type: Number, required: false},
  cardsToDebug: [Card],
  type: {type: String, required: true},
  speedPromisePoints: {type: Number, required: false},
  speedPromiseTotal: {type: Number, required: false},
});

export default model<IRoundPlayer>("RoundPlayer", roundPlayerSchema);
