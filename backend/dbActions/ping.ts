import mongoose from "mongoose";
import { IPing } from "../interfaces/IPing";
import Ping from "../models/Ping";

export const pingInsert = async (ping: IPing): Promise<IPing> => {
  const newPing = new Ping(ping);
  try {
    const insertedPing = await newPing.save();
    return {
      timestamp: insertedPing.timestamp,
      returnId: insertedPing.id,
    } as IPing;
  } catch (e) {
    console.error(e);
    return ping;
  }
};

export const pingDelete = async (id: string): Promise<boolean> => {
  if (!mongoose.isValidObjectId(id)) return false;
  try {
    const deleteResult = await Ping.deleteOne({
      id: id,
    });
    return deleteResult.deletedCount === 1;
  } catch (e) {
    console.error(e);
    return false;
  }
};
