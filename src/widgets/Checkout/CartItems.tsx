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

export default function CartItems() {
  return (
    <Provider store={store}>
      <CartItemsContent />
    </Provider>
  );
}

function CartItemsContent() {
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
              className="relative space-y-3 h-32 border-b py-4"
              key={product_key}
            >
              <div
                className="flex flex-row rounded-lg gap-5 h-full"
                key={currentBook.id}
              >
                <Image
                  className=" h-full w-auto object-cover object-center"
                  src={currentBook.image}
                  alt=""
                  width={146}
                  height={184}
                />
                <div className="flex-col flex flex-1 overflow-hidden lg:text-lg">
                  <span className=" line-clamp-3">{currentBook.title}</span>

                  <p className=" mt-auto font-light text-sm lg:text-base">
                    {currentCartItem.quantity} x {currentBook.price} руб
                  </p>
                  {/* <p className="text-lg absolute top-4 right-4 font-medium bg-white px-2">
                    x{currentCartItem.quantity}
                  </p> */}
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
