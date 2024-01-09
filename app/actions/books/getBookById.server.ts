"use server";
import { prismaWithCaching } from "../../lib/prisma";

export default async function getBookById({ bookId }: { bookId: string }) {
  let selectedBook = await prismaWithCaching.book.findFirst({
    include: {
      reviews: true,
    },
    cacheStrategy: { ttl: 60, swr: 60 },
    where: {
      id: bookId || "666",
    },
  });
  return selectedBook;
}
