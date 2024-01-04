// filtersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Определение типа для настроек фильтров
interface FiltersState {
  items: string[];
}
const initialState: FiltersState = {
  items: [
    "romantic",
    "fantasy",
    "true-crime",
    "science-fiction",
    "dystopie",
    "thriller",
  ],
};

// Создание slice
const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    // Action для обновления фильтров
    updateFilters: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
    },
  },
});

// Экспорт actions и reducer
export const { updateFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
