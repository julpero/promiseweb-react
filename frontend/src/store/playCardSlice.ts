import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IuiCard } from "../interfaces/IuiPlayingGame";
import { RootState } from "./store";

export interface PlayCardState {
  value: {
    playedCard: IuiCard | null,
  },
}

const initialState: PlayCardState = {
  value: {
    playedCard: null,
  },
};

export const playCardSlice = createSlice({
  name: "playCard",
  initialState,
  reducers: {
    setPlayedCard: (state, action: PayloadAction<IuiCard | null>) => {
      state.value.playedCard = action.payload;
    },
  }
});

export const { setPlayedCard } = playCardSlice.actions;

export const getPlayedCard = (state: RootState) => state.playCardReducer.value.playedCard;

export default playCardSlice.reducer;
