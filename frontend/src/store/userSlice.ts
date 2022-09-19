import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface UserState {
  isUserLoggedIn: boolean,
  userName: string,
}

const initialState: UserState = {
  isUserLoggedIn: false,
  userName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoggedIn: (state, action: PayloadAction<{loggedIn: boolean, name: string}>) => {
      state.isUserLoggedIn = action.payload.loggedIn;
      state.userName = action.payload.name;
    },
  }
});

export const { setUserLoggedIn } = userSlice.actions;

// export const isUserLoggedIn = (state: RootState) => state.userReducer.isUserLoggedIn;
// export const getUserName = (state: RootState) => state.userReducer.userName;
export const getUser = (state: RootState) => state.userReducer;

export default userSlice.reducer;
