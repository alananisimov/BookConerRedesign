import store from "@/app/store/store";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Button } from "shadcn/components/ui/button";
import { CartSheetWrapper } from "./CartSheet";
import { RootState } from "@/app/store/rootReducer";
import { openCart } from "@/app/store/cartStateSlice";

export default function CartButtonWrapper() {
  return (
    <Provider store={store}>
      <CartButton />
    </Provider>
  );
}

export function CartButton() {
  const [open, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartSheetWrapperOpen = useSelector(
    (state: RootState) => state.cartState.isOpen
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      <CartSheetWrapper
        open={cartSheetWrapperOpen}
        setOpen={(arg: boolean) => dispatch(openCart(arg))}
        className={""}
      />
      <div className="">
        <Button
          className="hover:bg-transparent pl-4 py-0 px-1.5 h-[36px] focus:outline-none focus:border-0 transition-all ease-in-out hover:scale-110 inline-block relative"
          variant={"ghost"}
          onClick={() => dispatch(openCart(true))}
        >
          <div className="">
            <ShoppingCart color="black" />
            {isClient && Object.keys(cartItems).length !== 0 && (
              <span className="absolute top-0 end-0 flex h-2.5 w-2.5 rounded-full ring-white bg-teal-400"></span>
            )}
          </div>
        </Button>
      </div>
    </>
  );
}
