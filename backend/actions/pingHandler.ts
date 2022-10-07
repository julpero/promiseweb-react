import { pingDelete, pingInsert } from "../dbActions/ping";
import { IPing } from "../interfaces/IPing";

export const doPing = async (timestamp: number): Promise<IPing> => {
  const ping: IPing = {
    timestamp: timestamp,
  };
  const insertedPing = await pingInsert(ping);
  if (insertedPing && insertedPing.returnId) {
    return insertedPing;
  }
  return ping;
};

export const deletePing = async (id: string): Promise<boolean> => {
  return await pingDelete(id);
};
