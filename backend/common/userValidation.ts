import { validate as uuidValidate } from "uuid";
import { sign, verify } from "jsonwebtoken";

export interface IToken {
  userName: string,
  uuid: string,
  timestamp: number,
}

/**
 * This method does simple check to given parameters and checks if user name is in admin list.
 * @param userName string
 * @param uuid string
 * @returns boolean
 */
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

/**
 * This method only validates that given parameters are "valid".
 * There is no any authentication processes in this method.
 * @param userName string
 * @param password string
 * @param uuid string
 * @returns boolean
 */
export const isValidUser = (userName: string, password: string, uuid: string): boolean => {
  if (!userName || !password || !uuid) return false;
  if (userName.trim().length < 3) return false;
  if (password.length < 4) return false;
  if (!uuidValidate(uuid)) return false;

  return true;
};

/**
 * This method checks if given token is valid and it contains correct user name and uuid.
 * Timestamp must be in defined interval.
 * @param token
 * @param userName string
 * @param uuid string
 * @param timestamp number
 * @returns boolean
 */
export const isUserAuthenticated = (token: string | string[] | undefined, userName: string, uuid: string, timestamp: number | null): boolean => {
  // console.log("isUserAuthenticated");
  // our timestamp can be only one hour old (60 min * 60 sec * 1000 ms)
  const ALLOWED_INTERVAL = parseInt(process.env.SESSION_MINUTES ?? "60", 10) * 60 * 1000;

  if (userName !== userName.trim()) return false;

  const parsedToken = getValidToken(token);
  if (parsedToken) {
    const timeStampOk = (timestamp ?? 0) + ALLOWED_INTERVAL > Date.now();
    const authenticationOk = (parsedToken.userName === userName && parsedToken.uuid === uuid && timeStampOk);
    // console.log("authenticationOk", authenticationOk);
    return authenticationOk;
  } else {
    return false;
  }
};

/**
 * This method only checks if the given token is formally valid in Promise Web.
 * This does not check if data in the token is valid except timestamp.
 * @param token
 * @returns IToken if token is valid, else null
 */
export const getValidToken = (token: string | string[] | undefined): IToken | null => {
  // console.log("getValidToken, token", token);
  // our timestamp can be only one hour old (60 min * 60 sec * 1000 ms)
  const ALLOWED_INTERVAL = parseInt(process.env.SESSION_MINUTES ?? "60", 10) * 60 * 1000;

  // valid token is always set
  if (!token || token === undefined) return null;

  // our token is always string
  if (typeof token !== "string") return null;

  // JWT must be splitted into three parts by full stop (.)
  if (token.split(".").length !== 3) return null;

  const checked = verify(token, process.env.AUTH_SECRET ?? "MUST_SET_THIS");
  // console.log("checked", checked);

  // our token is always object (JWTPayload)
  if (typeof checked === "string") return null;

  // our token has uuid, userName amd timestamp fields
  if (!checked.uuid) return null;
  if (!checked.userName) return null;
  if (!checked.timestamp) return null;
  const parsedTimeStamp = parseInt(checked.timestamp, 10);
  if (parsedTimeStamp + ALLOWED_INTERVAL < Date.now()) return null;

  return {
    uuid: checked.uuid,
    userName: checked.userName,
    timestamp: parsedTimeStamp,
  } as IToken;
};

export const signUserToken = (userName: string, uuid: string, timestamp: number): string => {
  const tokenBody: IToken = {
    userName: userName,
    uuid: uuid,
    timestamp: timestamp,
  };
  return sign(tokenBody, process.env.AUTH_SECRET ?? "SET_THIS_NOW");
};
