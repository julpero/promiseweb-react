import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ActionsAvailableState {
  value: {
    actionsAvailable: boolean,
  },
}

const initialState: ActionsAvailableState = {
  value: {
    actionsAvailable: true,
  },
};

export const actionsAvailableSlice = createSlice({
  name: "actionsAvailable",
  initialState,
  reducers: {
    setActionsAvailable: (state, action: PayloadAction<boolean>) => {
      state.value.actionsAvailable = action.payload;
    }
  }
});

export const { setActionsAvailable } = actionsAvailableSlice.actions;

export const isActionsAvailable = (state: RootState) => state.actionsAvailableReducer.value.actionsAvailable;

export default actionsAvailableSlice.reducer;
