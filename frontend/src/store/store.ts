import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import gameInfoReducer from "./gameInfoSlice";
import roundInfoReducer from "./roundInfoSlice";
import getRoundInfoReducer from "./getRoundInfoSlice";
import playCardReducer from "./playCardSlice";
import animateCardReducer from "./animateCardSlice";
import emptySlotReducer from "./emptyAnimatedCardSlotSlice";
import collectCardsReducer from "./collectAnimatedCardsSlice";
import adminReducer from "./adminSlice";
import userReducer from "./userSlice";
import spinnerReducer from "./spinnerSlice";

const store = configureStore({
  reducer: {
    gameInfoReducer,
    roundInfoReducer,
    getRoundInfoReducer,
    playCardReducer,
    animateCardReducer,
    emptySlotReducer,
    collectCardsReducer,
    adminReducer,
    userReducer,
    spinnerReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
