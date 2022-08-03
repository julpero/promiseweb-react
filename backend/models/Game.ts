import { model, Schema } from "mongoose";
import { IGame } from "../../frontend/src/interfaces/IGameOptions"
import Round from "./Round";

const playerOrderPlayerSchema: Schema = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
});

const gameSchema: Schema = new Schema({
  playerOrder: [playerOrderPlayerSchema],
  rounds: [Round],
  lastTimeStamp: {type: Number, required: false},
});

export default model<IGame>("Game", gameSchema);
