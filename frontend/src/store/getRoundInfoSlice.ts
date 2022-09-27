import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IuiGetRoundRequest } from "../interfaces/IuiPlayingGame";
import { RootState } from "./store";

export interface GetRoundInfoState {
  value: IuiGetRoundRequest | null,
}

const initialState: GetRoundInfoState = {
  value: null,
};

export const getRoundInfoSlice = createSlice({
  name: "getRoundInfo",
  initialState,
  reducers: {
    setGetRoundInfo: (state, action: PayloadAction<IuiGetRoundRequest | null>) => {
      // console.log("STORE setGetRoundInfo", action);
      state.value = action.payload;
    }
  }
});

export const { setGetRoundInfo } = getRoundInfoSlice.actions;

export const getGetRoundInfo = (state: RootState) => state.getRoundInfoReducer.value;

export default getRoundInfoSlice.reducer;
