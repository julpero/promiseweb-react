import { model, Schema } from "mongoose";
import { ICard } from "../../frontend/src/interfaces/IGameOptions"

const cardSchema: Schema = new Schema({
  suit: String,
  rank: Number,
});

export default model<ICard>("Game", cardSchema);
