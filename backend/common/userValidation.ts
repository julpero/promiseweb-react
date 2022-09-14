import { validate as uuidValidate } from "uuid";
import { createHash } from "crypto";

export const isValidUser = (userName: string, uuid: string, hashString: string): boolean => {
  if (!userName || !uuid || !hashString) return false;
  if (userName.length < 4) return false;
  if (!uuidValidate(uuid)) return false;

  const secret = process.env.USER_HASH ?? "MUST_SET";
  const strToHash = `${userName}:${secret}`;
  const compareStr = createHash("sha256").update(strToHash).digest("base64");
  if (compareStr !== hashString) return false;

  return true;
};
