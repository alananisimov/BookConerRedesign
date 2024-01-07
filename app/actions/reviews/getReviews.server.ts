"use server";
import prisma, { prismaWithCaching } from "../../../lib/prisma";
import { ApiError, ReviewResponse } from "@/app/models";
import { User } from "@prisma/client";
import { kv } from "@vercel/kv";

export default async function getReview(bookId: number) {
  const cacheKey = `reviews-${bookId}`;

  const cachedData: ReviewResponse | null = await kv.get(cacheKey);

  if (cachedData) {
    return cachedData;
  }

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

  await kv.set(cacheKey, JSON.stringify(response));

  return response;
}
