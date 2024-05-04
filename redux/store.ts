import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import getNewRegisteredUserUsernameSlice from "./slices/getNewRegisteredUserUsernameSlice";

export const store = configureStore({
  reducer: {
    getNewRegisteredUserUsernameSlice: getNewRegisteredUserUsernameSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
