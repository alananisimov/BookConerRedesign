"use server";
import prisma, { prismaWithCaching } from "../../../lib/prisma";
import { CreateReviewData } from "@/app/models";
import { kv } from "@vercel/kv";

export default async function getBookById({ bookId }: { bookId: string }) {
  let selectedBook = await prismaWithCaching.book.findFirst({
    cacheStrategy: { ttl: 60, swr: 60 },
    where: {
      id: parseInt(bookId) || 666,
    },
  });
  return selectedBook;
}
