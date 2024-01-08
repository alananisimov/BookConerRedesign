import { CartItem, addItem, removeItem } from "@/app/store/cartSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { PieChart } from "lucide-react";
interface args {
  cartItems: Record<string, CartItem>;
}
export default function TestSheetContent({ cartItems }: args) {
  const dispatch = useDispatch();
  return (
    <>
      {Object.keys(cartItems).length ? (
        Object.keys(cartItems).map((product_key) => {
          const currentCartItem = cartItems[product_key];
          const currentBook = currentCartItem.book;
          return (
            <div
              key={product_key}
              className="relative flex w-full flex-row justify-between px-1 py-4 border-b"
            >
              <div className="absolute z-40 -mt-2 ml-[55px]">
                <button
                  onClick={() => {
                    Array.from({
                      length: currentCartItem.quantity,
                    }).forEach(() => {
                      dispatch(removeItem(product_key));
                    });
                  }}
                  aria-label="Remove cart item"
                  aria-disabled="false"
                  className="ease flex h-[17px] w-[17px] items-center justify-center transition-all duration-200 rounded-full bg-neutral-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="hover:text-accent-3 mx-[1px] h-4 w-4 text-black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
                <p aria-live="polite" className="sr-only" role="status"></p>
              </div>
              <Link
                className="z-30 flex flex-row space-x-4"
                href={`/books/${currentBook.id}`}
              >
                <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-sm border">
                  <Image
                    alt="Acme Circles T-Shirt"
                    className="h-full w-full object-cover"
                    src={currentBook.image}
                    height={64}
                    width={64}
                  />
                </div>
                <div className="flex flex-1 flex-col text-base">
                  <span className="leading-tight line-clamp-2">
                    {currentBook.title}
                  </span>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {currentBook.category}
                  </p>
                </div>
              </Link>
              <div className="flex h-16 flex-col justify-between">
                <p className="flex justify-end space-y-2 text-right text-sm">
                  {currentBook.price * currentCartItem.quantity}
                  <span className="ml-1 inline">RUB</span>
                </p>
                <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                  <button
                    onClick={() => {
                      dispatch(removeItem(product_key));
                    }}
                    aria-label="Reduce item quantity"
                    aria-disabled="false"
                    className="ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80 ml-auto"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4 dark:text-neutral-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 12h-15"
                      ></path>
                    </svg>
                  </button>
                  <p aria-live="polite" className="sr-only" role="status"></p>
                  <p className="w-6 text-center">
                    <span className="w-full text-sm">
                      {currentCartItem.quantity}
                    </span>
                  </p>
                  <button
                    onClick={() => {
                      dispatch(
                        addItem({
                          itemId: product_key,
                          book: currentBook,
                        })
                      );
                    }}
                    aria-label="Increase item quantity"
                    aria-disabled="false"
                    className="ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4 dark:text-neutral-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      ></path>
                    </svg>
                  </button>
                  <p aria-live="polite" className="sr-only" role="status"></p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <div className="flex rounded-lg bg-white flex-row border mx-auto my-auto max-w-sm ">
            <Image
              className=" rounded-md object-cover object-center h-16 w-16"
              src="https://i.ibb.co/mCTDNvJ/empty-4731755.png"
              alt="No cart items"
              height={96}
              width={96}
            />

            <div className="flex w-full flex-col  my-auto pr-1.5">
              <span className="text-sm">
                Вы еще ничего не положили в корзину
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
