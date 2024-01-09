"use server";
import { prismaWithCaching } from "../../lib/prisma";

export default async function getBookByName({
  bookName,
}: {
  bookName: string;
}) {
  let selectedBook = await prismaWithCaching.book.findFirst({
    include: {
      reviews: true,
    },
    where: {
      title: decodeURIComponent(bookName) || "666",
    },
  });
  return selectedBook;
}
