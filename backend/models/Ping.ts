import { model, Schema } from "mongoose";
import { IPing } from "../interfaces/IPing";

import { PING_COLLECTION } from "./Collections";

const pingSchema: Schema = new Schema({
  timestamp: {type: Number, required: true},
  returnId: {type: String, required: false},
}, {
  collection: PING_COLLECTION,
  timestamps: false,
  strictQuery: "throw",
});

export default model<IPing>("Ping", pingSchema);
