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

export enum LOGIN_RESPONSE {
  Ok,
  PasswordFails,
  PasswordMismatch,
  Password2Empty,
  PasswordShort,
}
