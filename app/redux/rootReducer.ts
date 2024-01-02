// rootReducer.ts
import { combineReducers } from "redux";
import cartReducer from "./cartSlice";
import filterSlice from "./filterSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  filter: filterSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
