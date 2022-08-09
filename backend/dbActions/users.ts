import User from "../models/User";
import { ICheckLoginRequest, ICheckLoginResponse } from "../interfaces/IUser";
import { LOGIN_RESPONSE } from "../../frontend/src/interfaces/IUser";

import bcrypt from "bcrypt";

export const checkLogin = async ({userName, userPass1, userPass2}: ICheckLoginRequest): Promise<ICheckLoginResponse> => {
  const loginObj: ICheckLoginResponse = {
    result: LOGIN_RESPONSE.passwordFails,
    loginOk: false,
  };
  if (!userName || !userPass1) {
    return loginObj;
  }
  const secretConfig = process.env.BCRYPT_SECRET ?? "qwaszxpolkmn";
  const passStr = userPass1+":"+secretConfig+":"+userName;
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? "10", 10);

  const uQuery = User.where({
    playerName: { $eq: userName }
  });
  const user = await uQuery.findOne();
  if (!user) {
    // first time user, check if there is also second password
    if (userPass2.length === 0) {
      loginObj.result = LOGIN_RESPONSE.password2Empty;
      return loginObj;
    }
    // first time user, check if both passwords match
    if (userPass1 !== userPass2) {
      loginObj.result = LOGIN_RESPONSE.passwordMismatch;
      return loginObj;
    }
    if (userPass1.length < 4) {
      loginObj.result = LOGIN_RESPONSE.passwordShort;
      return loginObj;
    }

    // else create new user
    const hashedPass = await bcrypt.hash(passStr, saltRounds);
    const newUserObj = new User({
      playerName: userName,
      passHash: hashedPass,
    });
    const newUser = await newUserObj.save();
    if (newUser) {
      loginObj.loginOk = true;
      loginObj.result = LOGIN_RESPONSE.ok;
    }
  } else {
    console.log("is user", user);
    // check if password matches
    const passOk = await bcrypt.compare(passStr, user.passHash);
    if (passOk) {
      loginObj.result = LOGIN_RESPONSE.ok;
      loginObj.loginOk = true;
    } else {
      loginObj.result = LOGIN_RESPONSE.passwordFails;
      loginObj.loginOk = false;
    }
  }

  return loginObj;
};
