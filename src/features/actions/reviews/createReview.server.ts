// Import necessary modules
"use server";
import { prismaWithCaching } from "../../../app/lib/prisma";
import { ApiError, CreateReviewData } from "src/app/models";
import { kv } from "@vercel/kv";

export default async function createReview(data: CreateReviewData) {
  const { content, rating, userEmail, bookId } = data;
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
