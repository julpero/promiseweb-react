import { Schema } from "mongoose";
import { ICard } from "../interfaces/IGameOptions";

const cardSchema = new Schema<ICard>({
  suite: {type: String, required: true},
  value: {type: Number, required: true},
  rank: {type: String, required: false},
});

export default cardSchema;
