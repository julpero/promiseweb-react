import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface AdminState {
  value: {
    isAdminLoggedIn: boolean,
  },
}

const initialState: AdminState = {
  value: {
    isAdminLoggedIn: false,
  },
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.value.isAdminLoggedIn = action.payload;
    }
  }
});

export const { setAdminLoggedIn } = adminSlice.actions;

export const isAdminLoggedIn = (state: RootState) => state.adminReducer.value.isAdminLoggedIn;

export default adminSlice.reducer;
