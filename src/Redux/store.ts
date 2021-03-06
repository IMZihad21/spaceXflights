import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import themeModeSlice from "Redux/slices/themeModeSlice";
import flightSlice from "Redux/slices/flightSlice";

const store = configureStore({
  reducer: {
    themeMode: themeModeSlice,
    flights: flightSlice,
  },
});

export default store;

type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
