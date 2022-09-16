import { validate as uuidValidate } from "uuid";
import { sign, verify, JwtPayload } from "jsonwebtoken";
import { IuiUserData } from "../../frontend/src/interfaces/IuiUser";

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
  console.log("isUserAuthenticated");
  console.log("token", token);
  if (! token || token === undefined) return false;
  const checkToken = (typeof token === "object") ? token[0] : token;

  // JWT must be splitted into three parts by full stop (.)
  if (checkToken.split(".").length !== 3) return false;
  const checked = verify(checkToken, process.env.AUTH_SECRET ?? "MUST_SET_THIS");
  console.log("checked", checked);
  // return (checked.userName === userName && checked.uuid === uuid);
  return false;
};

export const signUserToken = (userName: string, uuid: string): string => {
  const tokenBody: IuiUserData = {
    userName: userName,
    uuid: uuid,
  };

  return sign(tokenBody, process.env.AUTH_SECRET ?? "MUST_SET_THIS");
};
