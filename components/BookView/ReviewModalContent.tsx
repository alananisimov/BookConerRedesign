import { StarIcon } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import Modal from "../shared/modal";
import { DialogDescription, DialogTitle } from "shadcn/components/ui/dialog";
import { Label } from "shadcn/components/ui/label";
import { Textarea } from "shadcn/components/ui/textarea";
import { Button } from "shadcn/components/ui/button";
import { toast } from "sonner";
import { getSession } from "next-auth/react";
import Book, { CreateReviewData } from "@/app/models";
import { ReviewResponse } from "@/pages/api/reviews/get_review";
import { User } from "@prisma/client";
import { refreshUserReviews } from "@/app/actions/refreshUserReviews";
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
          bookId: number;
          userEmail: string;
        }[]
      | undefined
    >
  >;
  setCanAddReview: Dispatch<SetStateAction<boolean>>;
  refreshReviews: () => Promise<void>;
};
type createReviewProps = {
  data: CreateReviewData;
};
async function createReview({ data }: createReviewProps) {
  const req = await fetch("/api/reviews/create_review", {
    body: JSON.stringify(data),
    method: "POST",
  });
  console.log(req);
  if (req.status == 202) {
    const createdReview: {
      id: number;
      content: string;
      rating: number;
      bookId: number;
      user: User;
    } | null = await req.json();
    console.log(createdReview);
    return createdReview;
  }
  return null;
}
export default function ReviewModalContent({
  setAddReviewOpen,
  addReviewOpen,
  setCanAddReview,
  setUserReviews,
  product,
  refreshReviews,
}: args) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };
  const submitReview = async (event: FormEvent) => {
    event.preventDefault();
    console.log("Review submitted with rating:", rating, "and text:", text);
    const currentSession = await getSession();
    if (
      currentSession &&
      currentSession.user &&
      typeof currentSession.user.email === "string"
    ) {
      const response = await createReview({
        data: {
          content: text,
          rating: rating,
          bookId: product.id,
          userEmail: currentSession.user.email,
        },
      });

      if (response) {
        setAddReviewOpen(false);
        setCanAddReview(false);
        const refreshed = await refreshUserReviews();
        setUserReviews(refreshed);
        refreshReviews();
        toast("Спасибо за ваш отзыв! ❤️");
      } else {
        setAddReviewOpen(false);
        setCanAddReview(true);
        toast("Произошла ошибка при добавлении отзыва!");
      }
    }
  };

  function handleTextChange(event: any) {
    setText(event.target.value);
  }
  return (
    <>
      <Modal showModal={addReviewOpen} setShowModal={setAddReviewOpen}>
        <form onSubmit={submitReview}>
          <div className="grid gap-4 p-4">
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
                className="w-full"
                value={text}
                onChange={handleTextChange}
              />
            </div>
            <Button type="submit" variant={"outline"} className="mt-8">
              Сохранить отзыв
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
