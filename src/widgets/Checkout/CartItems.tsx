/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "@chakra-ui/react";
import { RootState } from "@/app/store/rootReducer";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Button } from "src/shared/ui/shadcn/components/ui/button";
import store from "@/app/store/store";
import { removeItem } from "@/app/store/slices/cartSlice";

export function CartItemsWrapper() {
  return (
    <Provider store={store}>
      <CartItems />
    </Provider>
  );
}

export default function CartItems() {
  const [imageLoaded, setLoaded] = useState(Boolean);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const dispatch = useDispatch();
  return (
    <>
      {Object.keys(cartItems).length !== 0 ? (
        Object.keys(cartItems).map((product_key) => {
          const currentCartItem = cartItems[product_key];
          const currentBook = currentCartItem.book;
          return (
            <div
              className="relative space-y-3 rounded-lg border bg-white px-4 py-4 sm:px-6"
              key={product_key}
            >
              <div
                className="flex flex-row rounded-lg bg-white gap-5"
                key={currentBook.id}
              >
                <Image
                  className=" h-full p-2 w-auto max-h-32 rounded-md border object-cover object-center"
                  src={currentBook.image}
                  alt=""
                  width={146}
                  height={184}
                />
                <div className="flex-col flex flex-1 overflow-hidden">
                  <span className=" line-clamp-3 font-semibold">
                    {currentBook.title}
                  </span>

                  <p className="text-lg">
                    {" "}
                    {currentBook.price * currentCartItem.quantity} руб
                  </p>
                  <p className="text-lg absolute top-4 right-4 font-medium bg-white px-2">
                    x{currentCartItem.quantity}
                  </p>
                  <Button
                    className="mt-auto ml-auto w-fit"
                    onClick={() => {
                      Array.from({
                        length: currentCartItem.quantity,
                      }).forEach(() => {
                        dispatch(removeItem(product_key));
                      });
                    }}
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col rounded-lg bg-white sm:flex-row">
          <Skeleton isLoaded={imageLoaded}>
            <Image
              className="m-2 h-24 w-28 rounded-md border object-cover object-center"
              src="https://i.ibb.co/mCTDNvJ/empty-4731755.png"
              alt="No cart items"
              height={96}
              onLoad={() => setLoaded(true)}
              width={96}
            />
          </Skeleton>
          <div className="flex w-full flex-col px-4 py-4 justify-center">
            <span className="font-semibold">Ваша корзина пуста</span>
          </div>
        </div>
      )}
    </>
  );
}
