import { StarIcon } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import Modal from "../../shared/modal";
import {
  DialogDescription,
  DialogTitle,
} from "src/shared/ui/shadcn/components/ui/dialog";
import { Label } from "src/shared/ui/shadcn/components/ui/label";
import { Textarea } from "src/shared/ui/shadcn/components/ui/textarea";
import { Button } from "src/shared/ui/shadcn/components/ui/button";
import { toast } from "sonner";
import { getSession } from "next-auth/react";
import Book, { CreateReviewData } from "src/app/models";
import { refreshUserReviews } from "src/features/actions/reviews/refreshUserReviews";
import createReview from "src/features/actions/reviews/createReview.server";
import { LoadingDots } from "src/shared/icons";
type args = {
  setAddReviewOpen: Dispatch<SetStateAction<boolean>>;
  addReviewOpen: boolean;
  product: Book;
  setUserReviews: Dispatch<
    SetStateAction<
      | {
          id: number;
          content: string;
          rating: number;
          bookId: string;
          userEmail: string;
        }[]
      | undefined
    >
  >;
  setCanAddReview: Dispatch<SetStateAction<boolean>>;
  refreshReviews: () => Promise<void>;
};
export default function ReviewModalContent({
  setAddReviewOpen,
  addReviewOpen,
  setCanAddReview,
  setUserReviews,
  product,
  refreshReviews,
}: args) {
  const [rating, setRating] = useState(0);
  const text = useRef<HTMLTextAreaElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };
  const submitReview = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 3000);

    if (rating === 0) {
      toast("Пожалуйста укажите оценку товара");
      return;
    }
    if (text.current && text.current.value === "") {
      toast("Пожалуйста укажите текст отзыва на товар");
      return;
    }
    const currentSession = await getSession();

    if (
      currentSession &&
      currentSession.user &&
      typeof currentSession.user.email === "string" &&
      text.current
    ) {
      const response = await createReview({
        content: text.current.value,
        rating: rating,
        bookId: product.id,
        userEmail: currentSession.user.email,
      });

      if (response) {
        setAddReviewOpen(false);
        setCanAddReview(false);
        const refreshed = await refreshUserReviews();
        console.log(refreshed);
        refreshReviews();
        setUserReviews(refreshed.user_reviews);
        toast("Спасибо за ваш отзыв! ❤️");
        setIsSubmitting(false);
      } else {
        setAddReviewOpen(false);
        setCanAddReview(true);
        toast("Произошла ошибка при добавлении отзыва!");
      }
    }
  };
  return (
    <>
      <Modal showModal={addReviewOpen} setShowModal={setAddReviewOpen}>
        <form onSubmit={submitReview}>
          <div className="grid gap-4 p-6">
            <DialogTitle>Добавить отзыв</DialogTitle>
            <DialogDescription>
              Нажмите сохранить отзыв, когда будете готовы
            </DialogDescription>
            <div className="inline-flex gap-4">
              <Label htmlFor="name" className="text-right">
                Оценка
              </Label>
              <div className="flex gap-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`h-6 w-6 cursor-pointer ${
                      rating >= star ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => handleRatingClick(star)}
                  />
                ))}
              </div>
            </div>
            <div className=" inline-flex gap-4">
              <Label htmlFor="review" className="text-right">
                Отзыв
              </Label>
              <Textarea
                placeholder="Напишите текст отзыва тут..."
                id="review"
                className="w-full p-2"
                maxLength={500}
                ref={text}
              />
            </div>
            <Button
              type="submit"
              variant={"outline"}
              className="mt-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoadingDots color="black" /> : "Сохранить отзыв"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
