// uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  isMenuOpen: boolean;
}

const initialState: UiState = {
  isMenuOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const { toggleMenu } = uiSlice.actions;

export default uiSlice.reducer;
