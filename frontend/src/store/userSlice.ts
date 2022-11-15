import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface UserState {
  isUserLoggedIn: boolean,
  userName: string,
  connected: boolean,
}

const initialState: UserState = {
  isUserLoggedIn: false,
  userName: "",
  connected: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoggedIn: (state, action: PayloadAction<{loggedIn: boolean, name: string}>) => {
      state.isUserLoggedIn = action.payload.loggedIn;
      state.userName = action.payload.name;
    },
    setConnectionState: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
  }
});

export const { setUserLoggedIn, setConnectionState } = userSlice.actions;

// export const isUserLoggedIn = (state: RootState) => state.userReducer.isUserLoggedIn;
// export const getUserName = (state: RootState) => state.userReducer.userName;
export const getUser = (state: RootState) => state.userReducer;

export default userSlice.reducer;
