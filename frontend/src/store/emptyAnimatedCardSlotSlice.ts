import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface EmptySlotState {
  value: string | null,
}

const initialState: EmptySlotState = {
  value: null,
};

export const emptySlotSlice = createSlice({
  name: "emptySlot",
  initialState,
  reducers: {
    setEmptySlot: (state, action: PayloadAction<string | null>) => {
      state.value = action.payload;
    },
  }
});

export const { setEmptySlot } = emptySlotSlice.actions;

export const getEmptySlot = (state: RootState) => state.emptySlotReducer.value;

export default emptySlotSlice.reducer;
