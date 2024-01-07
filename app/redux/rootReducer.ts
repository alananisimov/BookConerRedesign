// rootReducer.ts
import { combineReducers } from "redux";
import cartReducer from "./cartSlice";
import filterSlice from "./filterSlice";
import uiSlice from "./uiSlice";
import cartStateSlice from "./cartStateSlice";
const rootReducer = combineReducers({
  cart: cartReducer,
  filter: filterSlice,
  ui: uiSlice,
  cartState: cartStateSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
