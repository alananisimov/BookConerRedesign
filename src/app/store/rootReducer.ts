// rootReducer.ts
import { combineReducers } from "redux";
import cartReducer from "./slices/cartSlice";
import filterSlice from "./slices/filterSlice";
import uiSlice from "./slices/uiSlice";
import cartStateSlice from "./slices/cartStateSlice";
const rootReducer = combineReducers({
  cart: cartReducer,
  filter: filterSlice,
  ui: uiSlice,
  cartState: cartStateSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
