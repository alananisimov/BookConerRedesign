import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { ApiError, Review } from "@/app/models";
import { User } from "@prisma/client";
import { kv } from "@vercel/kv";
export interface ReviewResponse {
  reviews:
    | {
        id: number;
        content: string;
        rating: number;
        bookId: number;
        user: User;
      }[]
    | [];
  totalCount: number;
  averageRating: number;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReviewResponse>
) {
  const { bookId } = req.query;
  console.log(bookId);
  if (req.method !== "GET") {
    return res.status(500);
  }

  const cacheKey = `reviews-${bookId}`;

  // Try to fetch cached data
  const cachedData: ReviewResponse | null = await kv.get(cacheKey);

  if (cachedData) {
    return res.status(200).json(cachedData);
  }

  if (typeof bookId === "string") {
    const reviews = await prisma.review.findMany({
      include: {
        user: true,
      },
      where: { bookId: parseInt(bookId, 10) },
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
    return res.status(200).json(response);
  } else return res.status(400);
}
