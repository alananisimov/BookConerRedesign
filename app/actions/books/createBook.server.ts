"use server";
import prisma from "../../lib/prisma";
import { CreateBookData, CreateReviewData } from "@/app/models";
import { kv } from "@vercel/kv";

export default async function createBook(data: CreateBookData) {
  const { description, title, price, image, genre, category } = data;

  const createReview = await prisma.book.create({
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
