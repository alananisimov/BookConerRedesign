// Import necessary modules
"use server";
import { prismaWithCaching } from "../../lib/prisma";
import { ApiError, CreateReviewData } from "@/app/models";
import { kv } from "@vercel/kv";

export default async function createReview(data: CreateReviewData) {
  const { content, rating, userEmail, bookId } = data;

  kv.del(`reviews-${bookId}`);
  const createReview = await prismaWithCaching.review.create({
    data: {
      content: content,
      rating: rating,
      userEmail: userEmail,
      bookId: bookId,
    },
    include: {
      user: true,
    },
  });
  return createReview;
}
