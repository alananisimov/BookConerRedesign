/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
"use client";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import Book from "@/app/models";
import Image from "next/image";
import { useDispatch, Provider } from "react-redux";
import store, { persistor } from "@/app/redux/store";
import { addItem } from "@/app/redux/cartSlice";
import { PersistGate } from "redux-persist/integration/react";
import Link from "next/link";
import { CartSheetWrapper } from "../TestSheet";
import { LoadingDots } from "../shared/icons";
import { Toaster } from "sonner";
import { ReviewResponse } from "@/pages/api/reviews/get_review";
import ReviewBlock from "./ReviewBlock";
import { Review } from "@prisma/client";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
interface props {
  product: Book;
  buyed_books: Book[] | undefined;
  user_reviews: Review[] | undefined;
}

export function BookViewWrapper({ product, buyed_books, user_reviews }: props) {
  return (
    <Provider store={store}>
      <Toaster />
      <PersistGate loading={null} persistor={persistor}>
        <BookView
          product={product}
          buyed_books={buyed_books}
          user_reviews={user_reviews}
        />
      </PersistGate>
    </Provider>
  );
}
async function fetchReviews({ product_id }: { product_id: number }) {
  const response = await fetch(`/api/reviews/get_review?bookId=${product_id}`);
  const data: ReviewResponse = await response.json();
  if (response.status !== 200) {
    console.error("Ошибка при загрузке отзывов");
  } else {
    console.log("Reviews:", data);
  }
  return data;
}

export default function BookView({
  product,
  buyed_books,
  user_reviews,
}: props) {
  const [reviews_data, setReviewsData] = useState<ReviewResponse>();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [canAddReview, setCanAddReview] = useState(false);
  const [userReviewsData, setUserReviewsData] = useState(user_reviews);
  async function refreshReviewsData() {
    const newReviews = await fetchReviews({ product_id: product.id });
    setReviewsData(newReviews);
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    refreshReviewsData();
    if (buyed_books) {
      const hasReviewInThisBook = userReviewsData?.some(
        (review) => review.bookId === product.id
      );
      setCanAddReview(
        (buyed_books?.some((book) => book.id === product.id) &&
          !hasReviewInThisBook) ||
          false
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyed_books, product.id, userReviewsData]);
  const product_data = {
    name: product.title,
    price: "$" + product.price,
    href: `/books/${product.id}`,
    breadcrumbs: [{ id: 1, name: product.category, href: "/home" }],
    images: [
      {
        src: product.image,
        alt: product.title,
      },
    ],
    description: product.description,
  };
  const reviews = {
    href: "#",
    average: reviews_data?.averageRating ? reviews_data.averageRating : 0,
    totalCount: reviews_data?.totalCount ? reviews_data.totalCount : 0,
  };

  const dispatch = useDispatch();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setLoading] = useState(Boolean);
  return (
    <div className="">
      <CartSheetWrapper
        open={isCartOpen}
        setOpen={setIsCartOpen}
        className={""}
      />

      <div className="">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 md:max-w-7xl"
          >
            {product_data.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <Link
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </Link>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product_data.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600 line-clamp-1"
              >
                {product_data.name}
              </a>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col">
          <div className="sm:inline-flex w-full justify-center">
            <div className=" mt-6 max-w-lg sm:px-6 sm:w-1/2 px-4 lg:gap-x-8 lg:px-8">
              <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg">
                <Image
                  src={product_data.images[0].src}
                  alt={product_data.images[0].alt}
                  className="h-full w-full object-cover object-center"
                  width={400}
                  height={500}
                  blurDataURL="URL"
                  placeholder="blur"
                />
              </div>
            </div>

            {/* Product info */}
            <div className=" max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16 sm:w-1/2">
              <div className="lg:col-span-2  lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product_data.name}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {product.price} RUB
                </p>

                {/* Reviews */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviews.average > rating
                              ? "text-gray-900"
                              : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                    <a
                      href={reviews.href}
                      className="ml-3 text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      {reviews.totalCount} отзыва
                    </a>
                  </div>
                </div>
                <div className="py-6 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
                  {/* Description and details */}
                  <div>
                    <h3 className="">Описание:</h3>

                    <div className="">
                      <p className="text-base text-gray-900 overflow-hidden text-pretty">
                        {showFullDescription
                          ? product.description
                          : `${product.description.slice(0, 200)}...`}
                      </p>
                      {!showFullDescription && (
                        <button
                          className="text-gray-900 hover:underline font-bold"
                          onClick={() => setShowFullDescription(true)}
                        >
                          ...ещё
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div></div>

                <button
                  disabled={isLoading}
                  className={`${
                    isLoading
                      ? "cursor-not-allowed mt-4 flex w-full items-center justify-center rounded-full border border-transparent bg-blue-600 px-8 h-12 text-base font-medium text-white"
                      : "mt-4 flex w-full items-center justify-center rounded-full border border-transparent bg-blue-600 px-8 h-12 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  } `}
                  onClick={() => {
                    dispatch(
                      addItem({ itemId: product.id.toString(), book: product })
                    );
                    setIsCartOpen(true);
                    setLoading(true);
                    setTimeout(() => setLoading(false), 1000);
                  }}
                >
                  {isLoading ? (
                    <LoadingDots color="#ffffff" />
                  ) : (
                    <>Добавить в корзину</>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className=" lg:max-w-5xl mx-auto w-full">
            <ReviewBlock
              user_reviews={userReviewsData}
              reviews={reviews_data}
              setUserReviews={setUserReviewsData}
              refreshReviews={refreshReviewsData}
              canAddReview={canAddReview}
              setCanAddReview={setCanAddReview}
              product={product}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
