"use server";
import prisma, { prismaWithCaching } from "../../../app/lib/prisma";
import { book_plus_reviews_init } from "src/app/models";

export default async function getBooksFeed() {
  const feed: book_plus_reviews_init = await prismaWithCaching.book.findMany({
    include: {
      reviews: true,
    },
  });
  const updatedFeed = feed.map((book) => {
    const totalRating = book.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = totalRating / book.reviews.length || 0;

    return {
      ...book,
      averageRating,
    };
  });
  return updatedFeed;
}
