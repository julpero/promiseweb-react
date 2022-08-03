import { Schema } from "mongoose";
import { IGame, IPlayer } from "../interfaces/IGameOptions"
import roundSchema from "./Round";

const playerOrderPlayerSchema = new Schema<IPlayer>({
  name: {type: String, required: true},
  type: {type: String, required: true},
});

const gameSchema = new Schema<IGame>({
  playerOrder: [playerOrderPlayerSchema],
  rounds: [roundSchema],
  lastTimeStamp: {type: Number, required: false},
});

export default gameSchema;
