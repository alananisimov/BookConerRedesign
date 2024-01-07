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
import Book, { ReviewResponse } from "@/app/models";
import Image from "next/image";
import { useDispatch, Provider } from "react-redux";
import store, { persistor } from "@/app/redux/store";
import { addItem } from "@/app/redux/cartSlice";
import { PersistGate } from "redux-persist/integration/react";
import Link from "next/link";
import { CartSheetWrapper } from "../TestSheet";
import { LoadingDots } from "../shared/icons";
import { Toaster } from "sonner";
import ReviewBlock from "./ReviewBlock";
import { Review } from "@prisma/client";
import getReview from "@/app/actions/reviews/getReviews.server";
import Breadcrumbs from "./compontents/Product/BreadCrumbs";
import ProductInfo from "./compontents/Product/ProductInfo";
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
  const data = await getReview(product_id);
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
    price: `${product.price}`,
    href: `/books/${product.id}`,
    breadcrumbs_data: [{ id: 1, name: product.category, href: "/home" }],
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
        <Breadcrumbs
          breadcrumbs={product_data.breadcrumbs_data}
          productName={product_data.name}
        />

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

            <div className=" max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16 sm:w-1/2">
              <div className="lg:col-span-2  lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product_data.name}
                </h1>
              </div>
              <ProductInfo
                price={product_data.price}
                reviews={reviews}
                description={product_data.description}
                showFullDescription={showFullDescription}
                onToggleDescription={() => setShowFullDescription(true)}
                onAddButtonClick={() => {
                  dispatch(
                    addItem({ itemId: product.id.toString(), book: product })
                  );
                  setIsCartOpen(true);
                  setLoading(true);
                  setTimeout(() => setLoading(false), 1000);
                }}
                isLoading={isLoading}
              />
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
