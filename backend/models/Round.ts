import { Schema } from "mongoose";
import { IRound, ICardPlayed } from "../interfaces/IGameOptions";
import cardSchema from "./Card";
import roundPlayerSchema from "./RoundPlayer";

const cardPlayedSchema = new Schema<ICardPlayed>({
  name: {type: String, required: true},
  card: cardSchema,
  playedTime: {type: Number, required: false},
  playStarted: {type: Number, required: false},
});

const roundSchema = new Schema<IRound>({
  roundIndex: {type: Number, required: true},
  cardsInRound: {type: Number, required: true},
  dealerPositionIndex: {type: Number, required: true},
  starterPositionIndex: {type: Number, required: true},
  roundPlayers: [roundPlayerSchema],
  trumpCard: cardSchema,
  totalPromise: {type: Number, required: false},
  totalRePromise: {type: Number, required: false},
  cardsPlayed: [[cardPlayedSchema]],
  roundStatus: {type: Number, required: true},
});

export default roundSchema;
