"use client";
import store from "@/app/redux/store";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Provider, useSelector } from "react-redux";
import { Button } from "shadcn/components/ui/button";
import { CartSheetWrapper } from "../TestSheet";
import { RootState } from "@/app/redux/rootReducer";

export default function CartButtonWrapper() {
  return (
    <Provider store={store}>
      <CartButton />
    </Provider>
  );
}
export function CartButton() {
  const [open, setOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  return (
    <>
      <CartSheetWrapper open={open} setOpen={setOpen} className={""} />
      <div className="">
        <Button
          className="pl-4 py-0 px-2 h-[36px] focus:outline-none focus:border-0 transition-all ease-in-out hover:scale-110 inline-block relative"
          onClick={() => setOpen(true)}
        >
          <div className=" ">
            <ShoppingCart />
            {Object.keys(cartItems).length !== 0 && (
              <span className="absolute top-0 end-0 block h-2.5 w-2.5 rounded-full ring-white bg-teal-400"></span>
            )}
          </div>
        </Button>
      </div>
    </>
  );
}
