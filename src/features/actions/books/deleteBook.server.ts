"use server";
import prisma, { prismaWithCaching } from "../../../app/lib/prisma";

export default async function deleteBook(book_id: string) {
  const deleteReview = await prismaWithCaching.book.delete({
    where: {
      id: book_id,
    },
  });
  return deleteReview;
}
