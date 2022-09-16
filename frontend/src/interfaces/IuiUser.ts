export enum LOGIN_RESPONSE {
  ok,
  passwordFails,
  passwordMismatch,
  password2Empty,
  passwordShort,
  justAdminCheck,
}

export interface IuiLoginRequest extends IuiUserData {
  password1: string,
  password2?: string,
  email?: string,
}

export interface IuiLoginResponse extends IuiAuth {
  loginStatus: LOGIN_RESPONSE,
  token?: string,
}

export interface IuiAuth {
  isAuthenticated?: boolean,
}

export interface IuiUserData {
  userName: string,
  uuid: string,
  token?: string,
}
