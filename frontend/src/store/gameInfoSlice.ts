import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HIDDEN_CARDS_MODE } from "../interfaces/IuiGameOptions";
import { IuiGetGameInfoResponse } from "../interfaces/IuiPlayingGame";
import { RootState } from "./store";

export interface GameInfoState {
  value: IuiGetGameInfoResponse,
  gameId: string,
}

const initialState: GameInfoState = {
  value: {
    gameId: "",
    humanPlayersCount: -1,
    computerPlayersCount: -1,
    rules: {
      ruleList: [],
      hiddenCardsMode: HIDDEN_CARDS_MODE.normal,
      roundInfo: {
        startRound: -1,
        turnRound: -1,
        endRound: -1,
      },
    },
    humanPlayers: [],
    hasPassword: false,
    currentRound: null,
    thisIsDemoGame: false,
  },
  gameId: "",
};

export const gameInfoSlice = createSlice({
  name: "gameInfo",
  initialState,
  reducers: {
    setGameInfo: (state, action: PayloadAction<IuiGetGameInfoResponse>) => {
      state.value = action.payload;
    },
    setGameId: (state, action: PayloadAction<string>) => {
      const newGameId = action.payload;
      state.gameId = newGameId;
      if (newGameId === "") {
        state.value = initialState.value;
      }
    }
  }
});

export const { setGameInfo, setGameId } = gameInfoSlice.actions;

export const getCurrentGameInfo = (state: RootState) => state.gameInfoReducer.value;
export const getCurrentGameId = (state: RootState) => state.gameInfoReducer.gameId;

export default gameInfoSlice.reducer;
