import { IJoinLeaveGameRequest, IJoinLeaveGameResponse, JOIN_LEAVE_RESULT } from "../../frontend/src/interfaces/IGameList";
import { LOGIN_RESPONSE } from "../../frontend/src/interfaces/IUser";
import { ICheckLoginRequest  } from "../interfaces/IUser";
import { checkLogin } from "../dbActions/users";
import { leaveTheGame } from "../dbActions/joinAndLeaveGame";

export const leaveGame = async (leaveGameRequest: IJoinLeaveGameRequest): Promise<IJoinLeaveGameResponse> => {
  console.log("leaveGameRequest", leaveGameRequest);
  const response: IJoinLeaveGameResponse = {
    joinLeaveResult: JOIN_LEAVE_RESULT.notOk,
    loginStatus: LOGIN_RESPONSE.ok,
  };

  const checkLoginObj: ICheckLoginRequest = {
    userName: leaveGameRequest.myName,
    userPass1: leaveGameRequest.password1 ?? "",
    userPass2: leaveGameRequest.password2 ?? "",
  };
  const loginObj = await checkLogin(checkLoginObj);
  response.loginStatus = loginObj.result;

  if (!loginObj.loginOk) {
    console.log("loginFailed", response.loginStatus);
    return response;
  }

  response.joinLeaveResult = await leaveTheGame(leaveGameRequest);

  return response;
};
