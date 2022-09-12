export enum LOGIN_RESPONSE {
  ok,
  passwordFails,
  passwordMismatch,
  password2Empty,
  passwordShort,
  justAdminCheck,
}

export interface IuiLoginRequest {
  uuid: string,
  hash: string,
  userName: string,
  password1: string,
  password2?: string,
}

export interface IuiLoginResponse {
  loginStatus: LOGIN_RESPONSE,
}
