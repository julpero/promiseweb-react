import { Schema } from "mongoose";
import { IHumanPlayer } from "../interfaces/IGameOptions";

const humanPlayerSchema = new Schema<IHumanPlayer>({
  name: {type: String, required: true},
  active: {type: Boolean, required: true},
  playerStats: {playerAvgPointsInRounds: [Number]},
  playedBy: {type: String, required: false},
},
{
  timestamps: true,
});

export default humanPlayerSchema;
