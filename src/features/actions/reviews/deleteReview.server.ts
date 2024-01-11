"use server";
import { prismaWithCaching } from "../../../app/lib/prisma";

export default async function deleteReview(reviewId: number) {
  const reviews = await prismaWithCaching.review.delete({
    where: {
      id: reviewId,
    },
  });

  return { reviews };
}
