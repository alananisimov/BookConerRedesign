// Import necessary modules
"use server";
import prisma from "../../../lib/prisma";
import { ApiError } from "@/app/models";
import { kv } from "@vercel/kv";

// Server component
export default async function deleteReview(reviewId: number) {
  const reviews = await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });

  kv.del(`reviews-${reviews.bookId}`);

  return { reviews };
}
