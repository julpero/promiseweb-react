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
  userName: string,
  password1: string,
  password2?: string,
}

export interface IuiLoginResponse {
  loginStatus: LOGIN_RESPONSE,
}
