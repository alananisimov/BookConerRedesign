"use client";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useMediaQuery from "@/lib/hooks/use-media-query";
import { Drawer } from "vaul";
import { cn } from "@/lib/utils";
import store, { persistor } from "@/app/redux/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RootState } from "@/app/redux/rootReducer";
import { Button } from "@chakra-ui/react";
import { addItem, removeItem, clearCart } from "@/app/redux/cartSlice";
import Image from "next/image";
import Link from "next/link";
import TestSheetContent from "./TestSheetContent";
import { ScrollArea } from "shadcn/components/ui/scroll-area";
interface props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  className: string | null;
}
export function CartSheetWrapper({ open, setOpen, className }: props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CartSheet open={open} setOpen={setOpen} className={className} />
      </PersistGate>
    </Provider>
  );
}
export default function CartSheet({ open, setOpen, className }: props) {
  const { isMobile } = useMediaQuery();
  const dispatch = useDispatch();
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
  if (isMobile) {
    return (
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-gray-100 bg-opacity-10 backdrop-blur" />
        <Drawer.Portal>
          <Drawer.Content
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50 mt-24 rounded-t-[10px] border-t border-gray-200 bg-white ",
              className
            )}
          >
            <div className="sticky top-0 z-20 flex w-full items-center justify-center rounded-t-[10px] bg-inherit ">
              <div className="my-3 h-1 w-12 rounded-full bg-gray-300" />
            </div>

            <div className="p-6">
              <ScrollArea>
                <div className="text-lg font-semibold">Моя корзина</div>
                <div className="mt-2">
                  <div className="grid grid-cols-1">
                    <TestSheetContent cartItems={cartItems} />
                  </div>
                  <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400 w-full left-0">
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>Доставка</p>
                      <p className="text-right">Будет расчитана позже</p>
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>Total</p>
                      <p className="text-right text-base text-black dark:text-white">
                        {totalAmount}
                        <span className="ml-1 inline">RUB</span>
                      </p>
                    </div>
                  </div>
                  <div className=" w-full">
                    <button className="w-full relative flex items-center justify-center rounded-full bg-blue-600 p-3 tracking-wide text-white">
                      Продолжить оформление
                    </button>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    );
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-sm">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute right-0 top-0 flex pt-6 pr-6">
                      <button
                        type="button"
                        className="relative rounded-md text-black focus:outline-none focus:border-0"
                        onClick={() => setOpen(false)}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-lg font-semibold leading-6 text-gray-900">
                        Моя корзина
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div className="grid grid-cols-1 gap-y-2">
                        <TestSheetContent cartItems={cartItems} />
                      </div>
                      <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400 absolute bottom-10 w-full left-0 px-6">
                        <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                          <p>Доставка</p>
                          <p className="text-right">Будет расчитана позже</p>
                        </div>
                        <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                          <p>Total</p>
                          <p className="text-right text-base text-black dark:text-white">
                            {totalAmount}
                            <span className="ml-1 inline">RUB</span>
                          </p>
                        </div>
                      </div>
                      <div className="absolute bottom-0 w-full right-0 px-6">
                        <button className="w-full relative flex items-center justify-center rounded-full bg-blue-600 p-3 tracking-wide text-white">
                          Продолжить оформление
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
