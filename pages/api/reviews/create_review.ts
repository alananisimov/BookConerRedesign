import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { ApiError, CreateReviewData, Review } from "@/app/models";
import { kv } from "@vercel/kv";
interface createReviewRequest extends NextApiRequest {
  body: string;
}
export default async function handler(
  req: createReviewRequest,
  res: NextApiResponse<CreateReviewData | ApiError>
) {
  if (req.method !== "POST") {
    return res.status(500).json({ error: "Ошибка при создании отзыва" });
  }

  console.log(req.body);
  let requestBody: CreateReviewData;

  try {
    requestBody = JSON.parse(req.body);
  } catch (error) {
    return res.status(400).json({ error: "Invalid JSON in the request body" });
  }
  const { content, rating, userEmail, bookId } = requestBody;
  console.log(content);
  kv.del(`reviews-${bookId}`);
  const createReview = await prisma.review.create({
    data: {
      content: content,
      rating: rating,
      userEmail: userEmail,
      bookId: bookId,
    },
  });
  return res.status(202).json(createReview);
}
