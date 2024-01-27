import { configureStore } from "@reduxjs/toolkit";
import trendingsSlice from "./slices/trendingsSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import articlesSlice from "./slices/articlesSlice";

export const store = configureStore({
  reducer: {
    trendings: trendingsSlice,
    articles: articlesSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
