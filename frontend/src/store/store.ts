import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import gameInfoReducer from "./gameInfoSlice";
import roundInfoReducer from "./roundInfoSlice";
import getRoundInfoReducer from "./getRoundInfoSlice";
import playCardReducer from "./playCardSlice";
import animateCardReducer from "./animateCardSlice";
import actionsAvailableReducer from "./actionsAvailableSlice";

const store = configureStore({
  reducer: {
    gameInfoReducer,
    roundInfoReducer,
    getRoundInfoReducer,
    playCardReducer,
    animateCardReducer,
    actionsAvailableReducer,
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
