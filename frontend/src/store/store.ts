import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import gameInfoReducer from "./gameInfoSlice";

const store = configureStore({
  reducer: gameInfoReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
