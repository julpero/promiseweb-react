import { validate as uuidValidate } from "uuid";
import { sign, verify } from "jsonwebtoken";

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

export const isUserAuthenticated = (token: string | undefined, userName: string, uuid: string): boolean => {
  console.log("isUserAuthenticated");
  console.log("token", token);
  if (!token || token === undefined) return false;

  // JWT must be splitted into three parts by full stop (.)
  if (token.split(".").length !== 3) return false;
  const checked = verify(token, process.env.AUTH_SECRET ?? "MUST_SET_THIS");
  console.log("checked", checked);

  if (typeof checked === "string") return false;
  return (checked.userName === userName && checked.uuid === uuid);
};

export const signUserToken = (userName: string, uuid: string): string => {
  const tokenBody = {
    userName: userName,
    uuid: uuid,
  };
  return sign(tokenBody, process.env.AUTH_SECRET ?? "SET_THIS_NOW");
};
