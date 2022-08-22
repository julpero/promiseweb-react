import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IuiCard, IuiGetRoundRequest } from "../interfaces/IuiPlayingGame";
import { RootState } from "./store";

export interface AnimateCard {
  cardFace: IuiCard | null,
  fromPlayer: string,
  fromSlot: number,
  getRoundRequest: IuiGetRoundRequest,
}

export interface AnimateCardState {
  value: {
    animateCard: AnimateCard | null,
  },
}

const initialState: AnimateCardState = {
  value: {
    animateCard: null,
  },
};

export const animateCardSlice = createSlice({
  name: "animateCard",
  initialState,
  reducers: {
    setAnimateCard: (state, action: PayloadAction<AnimateCard | null>) => {
      state.value.animateCard = action.payload;
    },
  }
});

export const { setAnimateCard } = animateCardSlice.actions;

export const getAnimateCard = (state: RootState) => state.animateCardReducer.value.animateCard;

export default animateCardSlice.reducer;
