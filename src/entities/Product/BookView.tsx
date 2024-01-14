"use client";
import { useEffect, useState } from "react";
import Book, { ReviewResponse } from "src/app/models";
import Image from "next/image";
import { useDispatch, Provider } from "react-redux";
import store, { persistor } from "src/app/store/store";
import { addItem } from "@/app/store/slices/cartSlice";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import ReviewBlock from "../Reviews/ReviewBlock";
import getReview from "src/features/actions/reviews/getReviews.server";
import Breadcrumbs from "../../widgets/Product/BreadCrumbs";
import ProductInfo from "../../widgets/Product/ProductInfo";
import { openCart } from "@/app/store/slices/cartStateSlice";
import { Review } from "@prisma/client";

interface props {
  product: Book;
  buyed_books: Book[] | undefined;
  user_reviews: Review[] | undefined;
}

export default function BookView({
  product,
  buyed_books,
  user_reviews,
}: props) {
  return (
    <Provider store={store}>
      <Toaster />
      <PersistGate persistor={persistor}>
        <BookViewContent
          product={product}
          buyed_books={buyed_books}
          user_reviews={user_reviews}
        />
      </PersistGate>
    </Provider>
  );
}

function BookViewContent({ product, buyed_books, user_reviews }: props) {
  const [reviews_data, setReviewsData] = useState<ReviewResponse>({
    reviews: [],
    totalCount: 0,
    averageRating: 0,
  });
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [canAddReview, setCanAddReview] = useState(false);
  const [userReviewsData, setUserReviewsData] = useState(user_reviews);
  const [isLoading, setLoading] = useState(Boolean);
  const dispatch = useDispatch();

  async function refreshReviewsData() {
    const data = await getReview(product.id);
    setReviewsData(data);
  }

  useEffect(() => {
    refreshReviewsData().then(() => {
      if (buyed_books) {
        const hasReviewInThisBook = userReviewsData?.some(
          (review) => review.bookId === product.id
        );
        setCanAddReview(
          (buyed_books?.some((buyed_book) => buyed_book.id === product.id) &&
            !hasReviewInThisBook) ||
            false
        );
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    href: "#reviews_block",
    average: reviews_data.averageRating,
    totalCount: reviews_data.totalCount,
  };

  return (
    <div className="">
      <div className="">
        <Breadcrumbs
          breadcrumbs={product_data.breadcrumbs_data}
          productName={product_data.name}
          productId={product.title}
        />

        <div className="flex flex-col h-full">
          <div className="sm:inline-flex w-full justify-center">
            <div className=" mt-6 max-w-sm sm:px-6 sm:w-full px-4 lg:gap-x-8 lg:px-8">
              <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg">
                <Image
                  src={product_data.images[0].src}
                  alt={product_data.images[0].alt}
                  className="h-full w-full object-cover object-center"
                  width={400}
                  height={500}
                />
              </div>
            </div>

            <div className=" max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16 sm:w-1/2">
              <div className="lg:col-span-2  lg:pr-8 mb-2">
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
                  dispatch(openCart(true));
                  setLoading(true);
                  setTimeout(() => setLoading(false), 1000);
                }}
                isLoading={isLoading}
              />
            </div>
          </div>
          <div className=" lg:max-w-6xl h-full mx-auto w-full mt-10">
            <ReviewBlock
              setReviews={setReviewsData}
              userReviews={userReviewsData}
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
