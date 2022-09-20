import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { setUserLoggedIn } from "../store/userSlice";

export const handleUnauthenticatedRequest = (dispatch: Dispatch<AnyAction>) => {
  console.warn("handleUnauthenticatedRequest");
  window.localStorage.removeItem("token");
  dispatch(setUserLoggedIn({loggedIn: false, name: ""}));
};

export const handleAuthenticatedRequest = (token: string | undefined) => {
  if (token) {
    window.localStorage.setItem("token", token);
  } else {
    console.warn("handleAuthenticatedRequest without token!");
    window.localStorage.removeItem("token");
  }
};
