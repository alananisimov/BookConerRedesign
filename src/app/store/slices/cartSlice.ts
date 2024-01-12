import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Book from "../../models";

export interface CartItem {
  quantity: number;
  book: Book;
}

interface CartState {
  items: Record<string, CartItem>;
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ itemId: string; book: Book }>) => {
      const { itemId, book } = action.payload;

      if (state.items[itemId]) {
        state.items[itemId].quantity += 1;
      } else {
        state.items[itemId] = { quantity: 1, book };
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      if (state.items[itemId] && state.items[itemId].quantity > 0) {
        state.items[itemId].quantity--;

        if (state.items[itemId].quantity === 0) {
          delete state.items[itemId];
        }
      }
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
