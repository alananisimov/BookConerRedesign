"use server";
import prisma, { prismaWithCaching } from "../../../lib/prisma";
import { ApiError } from "@/app/models";
import { kv } from "@vercel/kv";

export default async function deleteReview(reviewId: number) {
  const reviews = await prismaWithCaching.review.delete({
    where: {
      id: reviewId,
    },
  });

  kv.del(`reviews-${reviews.bookId}`);

  return { reviews };
}
