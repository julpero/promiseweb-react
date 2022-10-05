import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface SpinnerVisibleState {
  visible: boolean,
}

const initialState: SpinnerVisibleState = {
  visible: true,
};

export const spinnerVisibleSlice = createSlice({
  name: "spinnerVisible",
  initialState,
  reducers: {
    setSpinnerVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    }
  }
});

export const { setSpinnerVisible } = spinnerVisibleSlice.actions;

export const isSpinnerVisible = (state: RootState) => state.spinnerReducer.visible;

export default spinnerVisibleSlice.reducer;
