import { LOGIN_RESPONSE } from "../../frontend/src/interfaces/IUser";
export interface IUser {
  playerName: string,
  passHash: string,
}

export interface ICheckLoginRequest {
  userName: string,
  userPass1: string,
  userPass2: string,
}

export interface ICheckLoginResponse {
  result: LOGIN_RESPONSE,
  loginOk: boolean,
}
