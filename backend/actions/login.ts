import { IuiLoginRequest, IuiLoginResponse } from "../../frontend/src/interfaces/IuiUser";
import { checkLogin } from "../dbActions/users";
import { ICheckLoginRequest, ICheckLoginResponse } from "../interfaces/IUser";

export const handleLoginRequest = async (loginRequest: IuiLoginRequest): Promise<IuiLoginResponse> => {
  const checkLoginRequest: ICheckLoginRequest = {
    userName: loginRequest.userName,
    userPass1: loginRequest.password1,
    userPass2: "",
    needsToBeAdmin: true,
  };

  const loginCheck: ICheckLoginResponse = await checkLogin(checkLoginRequest);
  const loginResponse: IuiLoginResponse = {
    loginStatus: loginCheck.result,
  };
  return loginResponse;
};
