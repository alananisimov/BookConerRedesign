// Import necessary modules
"use server";
import prisma, { prismaWithCaching } from "../../../app/lib/prisma";
import { ReviewResponse } from "src/app/models";

export default async function getReview(bookId: string) {
  const reviews = await prismaWithCaching.review.findMany({
    include: {
      user: true,
    },
    where: { bookId: bookId },
  });

  const totalCount = reviews.length;
  const averageRating =
    totalCount > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalCount
      : 0;

  const response: ReviewResponse = {
    reviews: reviews,
    totalCount: totalCount,
    averageRating: averageRating,
  };

  return response;
}
