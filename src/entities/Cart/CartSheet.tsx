"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useMediaQuery from "src/app/lib/hooks/use-media-query";
import { Drawer } from "vaul";
import { cn } from "src/app/lib/utils";
import store from "src/app/store/store";
import CartSheetContent from "./CartSheetContent";
import { ScrollArea } from "src/shared/ui/shadcn/components/ui/scroll-area";
import { LoadingDots } from "../../shared/icons";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { toast } from "sonner";
import { useSignInModal } from "../Layout/SignInModal";
interface props {
  open: boolean;
  setOpen: (arg: boolean) => void;
  className: string | null;
}

export default function CartSheet({ open, setOpen, className }: props) {
  const { isMobile } = useMediaQuery();
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const cartItems = store.getState().cart.items;
  const totalAmount = Object.keys(cartItems).reduce(
    (accumulator, product_key) => {
      const currentCartItem = cartItems[product_key];
      const currentBook = currentCartItem.book;
      const itemTotalPrice = currentBook.price * currentCartItem.quantity;
      return accumulator + itemTotalPrice;
    },
    0
  );
  async function handleCheckout() {
    const session = await getSession();
    if (session === null) {
      toast("Пожалуйста войдите в аккаунт чтобы продолжить покупку");
      setOpen(false);
      setShowSignInModal(true);
      return;
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      router.push("/checkout");
      setOpen(false);
    }
  }
  const checkout_btn_cn = isLoading
    ? "cursor-not-allowed h-12 w-full relative flex items-center justify-center rounded-full bg-blue-600 p-3 tracking-wide text-white"
    : "h-12 w-full relative flex items-center justify-center rounded-full bg-blue-600 p-3 tracking-wide text-white";
  if (isMobile) {
    return (
      <>
        <SignInModal />
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
                      <CartSheetContent cartItems={cartItems} />
                    </div>
                    <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400 w-full left-0">
                      <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                        <p>Доставка</p>
                        <p className="text-right">Будет расчитана позже</p>
                      </div>
                      <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                        <p>Всего</p>
                        <p className="text-right text-base text-black dark:text-white">
                          {totalAmount}
                          <span className="ml-1 inline">RUB</span>
                        </p>
                      </div>
                    </div>
                    <div className=" w-full">
                      <span className={checkout_btn_cn}>
                        <button onClick={handleCheckout}>
                          {isLoading ? (
                            <LoadingDots color="#FFF" />
                          ) : (
                            "Продолжить оформление"
                          )}
                        </button>
                      </span>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </Drawer.Content>
            <Drawer.Overlay />
          </Drawer.Portal>
        </Drawer.Root>
      </>
    );
  }
  return (
    <>
      <SignInModal />
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
                          <CartSheetContent cartItems={cartItems} />
                        </div>
                        <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400 absolute bottom-10 w-full left-0 px-6">
                          <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                            <p>Доставка</p>
                            <p className="text-right">Будет расчитана позже</p>
                          </div>
                          <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                            <p>Всего</p>
                            <p className="text-right text-base text-black dark:text-white">
                              {totalAmount}
                              <span className="ml-1 inline">RUB</span>
                            </p>
                          </div>
                        </div>
                        <div className="absolute bottom-0 w-full right-0 px-6">
                          <button
                            disabled={Object.keys(cartItems).length === 0}
                            onClick={
                              isLoading === false ? handleCheckout : () => {}
                            }
                            className={checkout_btn_cn}
                          >
                            {isLoading ? (
                              <LoadingDots color="#FFF" />
                            ) : (
                              "Продолжить оформление"
                            )}
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
    </>
  );
}
