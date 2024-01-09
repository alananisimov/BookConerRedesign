"use server";
import prisma from "../../lib/prisma";

export default async function deleteBook(book_id: string) {
  const deleteReview = await prisma.book.delete({
    where: {
      id: book_id,
    },
  });
  return deleteReview;
}
