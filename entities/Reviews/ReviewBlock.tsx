import Book, { ReviewResponse } from "@/app/models";
import { cn } from "@/app/lib/utils";
import { Review } from "@prisma/client";
import { motion } from "framer-motion";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "shadcn/components/ui/button";
import ReviewModalContent from "./ReviewModalContent";
import { toast } from "sonner";
import { refreshUserReviews } from "@/app/actions/reviews/refreshUserReviews";
import deleteReview from "@/app/actions/reviews/deleteReview.server";
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item_style = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
interface args {
  reviews: ReviewResponse | undefined;
  canAddReview: boolean;
  refreshReviews: () => Promise<void>;
  setUserReviews: Dispatch<
    SetStateAction<
      | {
          id: number;
          content: string;
          rating: number;
          bookId: number;
          userEmail: string;
        }[]
      | undefined
    >
  >;
  setCanAddReview: Dispatch<SetStateAction<boolean>>;
  product: Book;
  user_reviews: Review[] | undefined;
}
export default function ReviewBlock({
  reviews,
  canAddReview,
  setCanAddReview,
  product,
  setUserReviews,
  refreshReviews,
  user_reviews,
}: args) {
  const [addReviewOpen, setAddReviewOpen] = useState(Boolean);
  const canDeleteReview = (reviewId: number) => {
    return user_reviews?.some((userReview) => userReview.id === reviewId);
  };
  async function deleteReviewReq(reviewId: number) {
    try {
      await deleteReview(reviewId);
      refreshReviews();
      const refreshed = await refreshUserReviews();
      setUserReviews(refreshed.user_reviews);
      toast("Вы успешно удалили отзыв!");
      setCanAddReview(true);
      setAddReviewOpen(false);
    } catch (error) {
      console.error("Error deleting review:", error);
      toast("Произошла ошибка при удалении отзыва");
    }
  }
  return (
    <>
      <ReviewModalContent
        product={product}
        refreshReviews={refreshReviews}
        setCanAddReview={setCanAddReview}
        setUserReviews={setUserReviews}
        addReviewOpen={addReviewOpen}
        setAddReviewOpen={setAddReviewOpen}
      />
      {reviews !== undefined &&
        (!reviews.reviews.length ? (
          <div className="px-6">
            <h1 className="text-2xl font-medium" id="reviews_block">
              Пока что отзывов нет 😔
            </h1>
            <p>Мы надеемся что вы станете первым покупетелем данной книги!</p>
            {canAddReview && (
              <motion.div className="item" variants={item_style}>
                <div className="flex flex-col items-start gap-y-3 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent h-full mt-4 max-w-lg">
                  <div className="text-sm max-h-24 w-full break-words">
                    Добавь свой отзыв на эту книгу!
                  </div>
                  <Button
                    variant={"outline"}
                    className="my-auto"
                    onClick={() => setAddReviewOpen(true)}
                  >
                    Добавить
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <div className=" h-full w-full" id="reviews_block">
            <h1 className="m-4 font-medium text-xl">Все отзывы</h1>
            <motion.div
              className=" "
              variants={container}
              initial="hidden"
              animate="visible"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-3 p-4 md:gap-3 md:p-5 pt-0 w-full">
                {reviews.reviews.map((item) => (
                  <motion.div
                    key={item.id}
                    className="item"
                    variants={item_style}
                  >
                    <div
                      className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent h-full relative"
                      key={item.id}
                    >
                      {canDeleteReview(item.id) && (
                        <div className="absolute right-0 top-0">
                          <Button onClick={() => deleteReviewReq(item.id)}>
                            Удалить
                          </Button>
                        </div>
                      )}
                      <div className="inline-flex w-full gap-x-2">
                        <div className="w-8 h-8 mt-1">
                          <Image
                            src={
                              item.user.image ||
                              "https://api.dicebear.com/7.x/pixel-art-neutral/svg?backgroundColor=b6e3f4,c0aede,d1d4f9"
                            }
                            width={64}
                            height={64}
                            className="rounded-full"
                            alt="avatar"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center">
                            <div className="flex items-center gap-2">
                              <div className="font-semibold">
                                {item.user.name}
                              </div>
                            </div>
                            <div
                              className={cn(
                                "ml-auto text-xs",
                                "text-foreground"
                              )}
                            ></div>
                          </div>
                          <div className="text-xs font-medium inline-flex gap-x-2">
                            {" "}
                            <div className="">
                              <div className="inline-flex">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                  <StarIcon
                                    key={rating}
                                    className={cn(
                                      item.rating > rating
                                        ? "text-orange-400"
                                        : "text-gray-300",
                                      "h-3.5 w-3.5 flex-shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                ))}
                              </div>
                            </div>{" "}
                            {item.rating +
                              (item.rating == 1
                                ? " балл"
                                : item.rating < 4
                                  ? " балла"
                                  : " баллов")}
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground max-h-24 w-full break-words">
                        {item.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {canAddReview && (
                  <motion.div className="item" variants={item_style}>
                    <div className="flex flex-col items-start gap-y-3 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent h-full">
                      <div className="text-sm max-h-24 w-full break-words">
                        Добавь свой отзыв на эту книгу!
                      </div>
                      <Button
                        variant={"outline"}
                        className="my-auto"
                        onClick={() => {
                          setAddReviewOpen(true);
                        }}
                      >
                        Добавить
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        ))}
    </>
  );
}
