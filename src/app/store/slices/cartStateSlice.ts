// filtersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Определение типа для настроек фильтров
interface cartOpenState {
  isOpen: boolean;
}
const initialState: cartOpenState = {
  isOpen: false,
};

// Создание slice
const cartOpenState = createSlice({
  name: "filters",
  initialState,
  reducers: {
    // Action для обновления фильтров
    openCart: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

// Экспорт actions и reducer
export const { openCart } = cartOpenState.actions;
export default cartOpenState.reducer;
