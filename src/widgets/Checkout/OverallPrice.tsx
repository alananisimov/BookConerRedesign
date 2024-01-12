"use client";
import { RootState } from "@/app/store/rootReducer";
import store from "@/app/store/store";
import { useSelector, useDispatch, Provider } from "react-redux";

export default function OverallPrice() {
  return (
    <Provider store={store}>
      <OverallPriceContent />
    </Provider>
  );
}

function OverallPriceContent() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = Object.keys(cartItems).reduce(
    (accumulator, product_key) => {
      const currentCartItem = cartItems[product_key];
      const currentBook = currentCartItem.book;
      const itemTotalPrice = currentBook.price * currentCartItem.quantity;
      return accumulator + itemTotalPrice;
    },
    0
  );
  return totalAmount;
}
