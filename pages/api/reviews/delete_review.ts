import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { ApiError, Review } from "@/app/models";
import { User } from "@prisma/client";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(500);
  }
  const { reviewId } = req.query;
  console.log(reviewId);
  if (typeof reviewId === "string") {
    const reviewIdNumber = parseInt(reviewId);
    console.log(reviewId);

    const reviews = await prisma.review.delete({
      where: {
        id: reviewIdNumber,
      },
    });
    if (reviews) {
      return res.status(202).json(reviews);
    }
  } else return res.status(400);
}
