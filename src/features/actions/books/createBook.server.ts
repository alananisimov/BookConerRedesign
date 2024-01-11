"use server";
import prisma, { prismaWithCaching } from "../../../app/lib/prisma";
import { CreateBookData, CreateReviewData } from "src/app/models";
import { kv } from "@vercel/kv";

export default async function createBook(data: CreateBookData) {
  const { description, title, price, image, genre, category } = data;

  const createReview = await prismaWithCaching.book.create({
    data: {
      description,
      title,
      price,
      image,
      genre,
      category,
    },
    include: {
      user: true,
    },
  });
  return createReview;
}
