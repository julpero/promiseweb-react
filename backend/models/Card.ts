import { Schema } from "mongoose";
import { ICard } from "../interfaces/IGameOptions"

const cardSchema = new Schema<ICard>({
  suit: {type: String, required: true},
  rank: {type: Number, required: true},
});

export default cardSchema;
