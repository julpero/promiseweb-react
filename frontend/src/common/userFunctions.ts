import bcrypt from "bcryptjs";
export const hashUserName = (userName: string): string => {
  const salt = bcrypt.genSaltSync(10);
  const secret = process.env.REACT_APP_USER_HASH ?? "NOT_SET";
  const strToHash = `${userName}:${secret}`;
  const hashed = bcrypt.hashSync(strToHash, salt);
  return hashed;
};
