// Import necessary modules
"use server";
import prisma from "../../../lib/prisma";
import { ApiError, CreateReviewData } from "@/app/models";
import { kv } from "@vercel/kv";

// Server component
export default async function createReview(data: CreateReviewData) {
  const { content, rating, userEmail, bookId } = data;

  console.log(content);
  kv.del(`reviews-${bookId}`);
  const createReview = await prisma.review.create({
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