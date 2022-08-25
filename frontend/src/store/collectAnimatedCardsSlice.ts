import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IuiGetRoundRequest } from "../interfaces/IuiPlayingGame";
import { RootState } from "./store";

export interface CollectCards {
    winner: string,
    winCount: number,
    getRoundRequest: IuiGetRoundRequest,
}

export interface CollectCardsState {
    value: CollectCards | null,
}

const initialState: CollectCardsState = {
  value: null,
};

export const collectCardsSlice = createSlice({
  name: "collectCards",
  initialState,
  reducers: {
    setCollectCards: (state, action: PayloadAction<CollectCards | null>) => {
      state.value = action.payload;
    },
  }
});

export const { setCollectCards } = collectCardsSlice.actions;

export const getCollectCards = (state: RootState) => state.collectCardsReducer.value;

export default collectCardsSlice.reducer;
