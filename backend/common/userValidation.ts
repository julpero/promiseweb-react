import { validate as uuidValidate } from "uuid";
import { sign, verify } from "jsonwebtoken";

export interface IToken {
  userName: string,
  uuid: string,
  timestamp: number,
}

export const isValidAdminUser = (userName: string, uuid: string): boolean => {
  if (!userName || !uuid) return false;
  if (userName.length < 3) return false;
  if (!uuidValidate(uuid)) return false;

  // check that user name is in admin list
  console.log("admin login...");
  const adminsStr = process.env.ADMIN_USER_NAME;
  if (!adminsStr) return false;
  const admins = adminsStr.split(",");
  if (!admins.some(admin => admin === userName)) {
    console.warn("... user name is not admin!");
    return false;
  }

  return true;
};

export const isValidUser = (userName: string, password: string, uuid: string): boolean => {
  if (!userName || !password || !uuid) return false;
  if (userName.length < 3) return false;
  if (password.length < 4) return false;
  if (!uuidValidate(uuid)) return false;

  return true;
};

export const isUserAuthenticated = (token: string | string[] | undefined, userName: string, uuid: string): boolean => {
  // console.log("isUserAuthenticated");

  const parsedToken = getValidToken(token);
  if (parsedToken) {
    return (parsedToken.userName === userName && parsedToken.uuid === uuid);
  } else {
    return false;
  }
};

export const getValidToken = (token: string | string[] | undefined): IToken | null => {
  // console.log("getValidToken, token", token);
  // valid token is always set
  if (!token || token === undefined) return null;

  // our token is always string
  if (typeof token !== "string") return null;

  // JWT must be splitted into four parts by full stop (.)
  if (token.split(".").length !== 4) return null;

  const checked = verify(token, process.env.AUTH_SECRET ?? "MUST_SET_THIS");
  // console.log("checked", checked);

  // our token is always object (JWTPayload)
  if (typeof checked === "string") return null;

  // our token has uuid, userName amd timestamp fields
  if (!checked.uuid) return null;
  if (!checked.userName) return null;
  if (!checked.timestamp) return null;
  const parsedTimeStamp = parseInt(checked.timestamp, 10);
  // our timestamp can be only one hour old (60 min * 60 sec * 1000 ms)
  const ALLOWED_INTERVAL = 60 * 60 * 1000;
  if (parsedTimeStamp + ALLOWED_INTERVAL < Date.now()) return null;

  return {
    uuid: checked.uuid,
    userName: checked.userName,
    timestamp: parsedTimeStamp,
  } as IToken;
};

export const signUserToken = (userName: string, uuid: string): string => {
  const tokenBody: IToken = {
    userName: userName,
    uuid: uuid,
    timestamp: Date.now(),
  };
  return sign(tokenBody, process.env.AUTH_SECRET ?? "SET_THIS_NOW");
};
