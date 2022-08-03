import User from "../models/User";
import { ICheckLoginRequest, ICheckLoginResponse, IUser, LOGIN_RESPONSE } from "../interfaces/IUser";

import bcrypt from 'bcrypt';

export const checkLogin = async ({userName, userPass1, userPass2}: ICheckLoginRequest): Promise<ICheckLoginResponse> => {
    const loginObj: ICheckLoginResponse = {
        result: LOGIN_RESPONSE.Ok,
        loginOk: true
    }
    if (!userName || !userPass1) {
        loginObj.loginOk = false;
        return loginObj;
    }
    const secretConfig = process.env.BCRYPT_SECRET ?? "qwaszxpolkmn";
    const passStr = userPass1+':'+secretConfig+':'+userName;
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? "10", 10);

    const uQuery = User.where({
        playerName: { $eq: userName }
    });
    const user = await uQuery.findOne();
    if (!user) {
        // return fail
        if (!userPass2) {
            loginObj.result = LOGIN_RESPONSE.PasswordFails;
            loginObj.loginOk = false;
            return loginObj;
        }
        // first time user, check if both passwords match
        if (userPass1 != userPass2) {
            loginObj.result = LOGIN_RESPONSE.PasswordMismatch;
            loginObj.loginOk = false;
        }
        if (userPass2.length == 0) {
            loginObj.result = LOGIN_RESPONSE.Password2Empty;
            loginObj.loginOk = false;
        }
        if (userPass1.length < 4) {
            loginObj.result = LOGIN_RESPONSE.PasswordShort;
            loginObj.loginOk = false;
        }

        if (loginObj.loginOk) {
            // create user
            bcrypt.hash(passStr, saltRounds, async function(err, hash) {
                const newUserObj = new User({
                    playerName: userName,
                    passHash: hash,
                });
                console.log("newUserObj", newUserObj);
                const newUser = await newUserObj.save();
                console.log("newUser", newUser);
            });
        }
    } else {
        console.log("is user", user);
        // check if password matches
        const passOk = await bcrypt.compare(passStr, user.passHash);
        if (!passOk) {
            loginObj.result = LOGIN_RESPONSE.PasswordFails;
            loginObj.loginOk = false;
        }
    }

    console.log("loginObj 2", loginObj);

    return loginObj;
}
