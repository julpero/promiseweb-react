import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IuiGetRoundResponse, ROUND_PHASE } from "../interfaces/IuiPlayingGame";
import { RootState } from "./store";

export interface RoundInfoState {
  value: IuiGetRoundResponse,
}

const initialState: RoundInfoState = {
  value: {
    gameId: "",
    roundInd: -1,
    userName: "",
    roundToPlayer: {
      cardsInRound: -1,
      dealerPositionIndex: -1,
      starterPositionIndex: -1,
      myCards: [],
      playableCards: [],
      players: [],
      trumpCard: null,
      myPlayedCard: null,
      playerInCharge: "",
      promiseTable: {
        players: [],
        promisesByPlayers: [],
        rounds: [],
      },
      cardInCharge: null,
      playerGoingToWinThisPlay: null,
      cardsPlayed: [],
      gameOver: false,
      whoseTurn: "",
      isMyTurn: false,
      isMyPromiseTurn: false,
      handValues: null, // TODO getHandValues(thisGame, roundInd),
      obsGame: null, // TODO obsGameToRoundObj
      roundPhase: ROUND_PHASE.initial,
    },
  },
};

export const roundInfoSlice = createSlice({
  name: "roundInfo",
  initialState,
  reducers: {
    setRoundInfo: (state, action: PayloadAction<IuiGetRoundResponse>) => {
      state.value = action.payload;
    }
  }
});

export const { setRoundInfo } = roundInfoSlice.actions;

export const getCurrentRoundFromRoundInfo = (state: RootState) => state.roundInfoReducer.value.roundInd;
export const getCurrentRoundInfo = (state: RootState) => state.roundInfoReducer.value;

export default roundInfoSlice.reducer;
