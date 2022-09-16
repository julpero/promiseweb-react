import { LOGIN_RESPONSE } from "../../frontend/src/interfaces/IuiUser";
export interface IUser {
  playerName: string,
  passHash: string,
  email: string,
}

export interface ICheckLoginRequest {
  userName: string,
  userPass1: string,
  userPass2: string,
  email: string,
  needsToBeAdmin?: boolean,
}

export interface ICheckLoginResponse {
  result: LOGIN_RESPONSE,
  loginOk: boolean,
}
