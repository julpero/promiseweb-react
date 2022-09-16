import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

import { USER_COLLECTION } from "./Collections";

const userSchema: Schema = new Schema({
  playerName: {type: String, required: true},
  passHash: {type: String, required: true},
  email: {type: String, required: false},
}, {
  collection: USER_COLLECTION,
  timestamps: true,
});

export default model<IUser>("User", userSchema);
