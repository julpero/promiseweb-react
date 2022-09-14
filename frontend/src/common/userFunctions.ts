import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";

export const hashUserName = (userName: string): string => {
  const secret = process.env.REACT_APP_USER_HASH ?? "NOT_SET";
  const strToHash = `${userName}:${secret}`;
  const hashed = Base64.stringify(sha256(strToHash));
  return hashed;
};
