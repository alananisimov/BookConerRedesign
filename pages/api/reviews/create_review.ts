import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { ApiError, CreateReviewData, Review } from "@/app/models";
interface createReviewRequest extends NextApiRequest {
  body: CreateReviewData;
}
export default async function handler(
  req: createReviewRequest,
  res: NextApiResponse<CreateReviewData | ApiError>
) {
  const { content, rating, userId, bookId } = req.body;
  if (req.method !== "POST") {
    return res.status(500).json({ error: "Ошибка при создании отзыва" });
  }

  console.log(req.body);
  const userExists = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!userExists) {
    return res.status(400).json({ error: "User not found" });
  }
  const createReview = await prisma.review.create({
    data: {
      content: content,
      rating: rating,
      userId: userId,
      bookId: bookId,
    },
  });
  return res.status(202).json(createReview);
}
