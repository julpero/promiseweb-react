import { IuiUserData } from "./IuiUser";

export interface IuiChatObj extends IuiUserData {
  gameId: string,
  chatLine: string,
}
