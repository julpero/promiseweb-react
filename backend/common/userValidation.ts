import { validate as uuidValidate } from "uuid";
import bcrypt from "bcrypt";

export const isValidUser = (userName: string, uuid: string, hashString: string): boolean => {
  if (!userName || !uuid || !hashString) return false;
  if (userName.length < 4) return false;
  if (!uuidValidate(uuid)) return false;

  const secret = process.env.USER_HASH ?? "MUST_SET";
  const strToHash = `${userName}:${secret}`;
  const compare = bcrypt.compareSync(strToHash, hashString);
  if (!compare) return false;

  return true;
};
