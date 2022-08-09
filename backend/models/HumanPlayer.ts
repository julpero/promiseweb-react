import { Schema } from "mongoose";
import { IHumanPlayer } from "../interfaces/IGameOptions";

const humanPlayerSchema = new Schema<IHumanPlayer>({
  name: {
    type: String,
    required: true,
  },
  playerId: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  playerStats: {
    playerAvgPointsInRounds: [Number],
  },
},
{
  timestamps: true,
});

export default humanPlayerSchema;
