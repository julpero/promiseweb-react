import { model, Schema } from "mongoose";
import { IHumanPlayer } from "../../frontend/src/interfaces/IGameOptions"

const humanPlayerSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  playerId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  playerStats: {
    playerAvgPointsInRounds: [Number],
  },
});

export default model<IHumanPlayer>("HumanPlayer", humanPlayerSchema);
