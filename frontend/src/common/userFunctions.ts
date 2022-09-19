import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { setUserLoggedIn } from "../store/userSlice";

export const handleUnauthenticatedRequest = (dispatch: Dispatch<AnyAction>) => {
  console.warn("handleUnauthenticatedRequest");
  window.localStorage.removeItem("token");
  dispatch(setUserLoggedIn({loggedIn: false, name: ""}));
};
