import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "Redux/store";

// Define a type for the slice state
interface ThemeModeState {
  mode: "light" | "dark";
}

// Define the initial state using that type
const initialState: ThemeModeState = {
  mode:
    localStorage.themeMode === "dark" ||
    (!("themeMode" in localStorage) &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? "dark"
      : "light",
};

const themeModeSlice = createSlice({
  name: "themeMode",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    switchThemeMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.themeMode = state.mode;
    },
  },
});

export const { switchThemeMode } = themeModeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectThemeMode = (state: RootState) => state.themeMode.mode;

export default themeModeSlice.reducer;
