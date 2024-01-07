// Import necessary modules
"use server";
import prisma from "../../../lib/prisma";
import { ApiError, ReviewResponse } from "@/app/models";
import { User } from "@prisma/client";
import { kv } from "@vercel/kv";
// Server component
export default async function getReview(bookId: number) {
  const cacheKey = `reviews-${bookId}`;

  // Try to fetch cached data
  const cachedData: ReviewResponse | null = await kv.get(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const reviews = await prisma.review.findMany({
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

  // Return the data needed for rendering
  return response;
}
