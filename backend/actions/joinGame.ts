import { IJoinLeaveGameRequest, IJoinLeaveGameResponse, JOIN_LEAVE_RESULT } from "../../frontend/src/interfaces/IuiGameList";
import { ICheckLoginRequest  } from "../interfaces/IUser";
import { checkLogin } from "../dbActions/users";
import { LOGIN_RESPONSE } from "../../frontend/src/interfaces/IuiUser";
import { joinOnGame } from "../dbActions/joinAndLeaveGame";

export const joinGame = async (joinGameRequest: IJoinLeaveGameRequest): Promise<IJoinLeaveGameResponse> => {
  console.log("joinGameRequest", joinGameRequest);
  const response: IJoinLeaveGameResponse = {
    joinLeaveResult: JOIN_LEAVE_RESULT.notOk,
    loginStatus: LOGIN_RESPONSE.ok,
  };

  const checkLoginObj: ICheckLoginRequest = {
    userName: joinGameRequest.myName,
    userPass1: joinGameRequest.password1 ?? "",
    userPass2: joinGameRequest.password2 ?? "",
  };
  const loginObj = await checkLogin(checkLoginObj);
  response.loginStatus = loginObj.result;

  if (!loginObj.loginOk) {
    console.log("loginFailed", response.loginStatus);
    return response;
  }

  response.joinLeaveResult = await joinOnGame(joinGameRequest);

  return response;
};
