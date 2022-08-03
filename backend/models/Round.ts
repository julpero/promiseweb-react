import { model, Schema } from "mongoose";
import { IRound } from "../../frontend/src/interfaces/IGameOptions"
import Card from "./Card";
import RoundPlayer from "./RoundPlayer";

const cardPlayedSchema: Schema = new Schema({
  name: {type: String, required: true},
  card: Card,
  playedTime: {type: Number, required: false},
  playStarted: {type: Number, required: false},
});

const roundSchema: Schema = new Schema({
  roundIndex: {type: Number, required: true},
  cardsInRound: {type: Number, required: true},
  dealerPositionIndex: {type: Number, required: true},
  starterPositionIndex: {type: Number, required: true},
  roundPlayers: [RoundPlayer],
  trumpCard: Card,
  totalPromise: {type: Number, required: false},
  cardsPlayed: [[cardPlayedSchema]],
  roundStatus: {type: Number, required: true},
});

export default model<IRound>("Round", roundSchema);
