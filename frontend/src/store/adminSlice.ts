import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IuiAdminGame } from "../interfaces/IuiAdminOperations";
import { RootState } from "./store";

export interface AdminState {
  value: {
    isAdminLoggedIn: boolean,
    adminGameList: IuiAdminGame[],
  },
}

const initialState: AdminState = {
  value: {
    isAdminLoggedIn: false,
    adminGameList: [],
  },
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.value.isAdminLoggedIn = action.payload;
    },
    setAdminGameList: (state, action: PayloadAction<IuiAdminGame[]>) => {
      state.value.adminGameList = action.payload;
    }
  }
});

export const { setAdminLoggedIn, setAdminGameList } = adminSlice.actions;

export const isAdminLoggedIn = (state: RootState) => state.adminReducer.value.isAdminLoggedIn;
export const getAdminGameList = (state: RootState) => state.adminReducer.value.adminGameList;

export default adminSlice.reducer;
