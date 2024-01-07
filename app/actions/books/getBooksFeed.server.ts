"use server";
import prisma, { prismaWithCaching } from "../../../lib/prisma";
import { CreateReviewData, book_plus_reviews_init } from "@/app/models";
import { kv } from "@vercel/kv";

// Server component
export default async function getBooksFeed() {
  const feed: book_plus_reviews_init = await prismaWithCaching.book.findMany({
    include: {
      reviews: true,
    },
    cacheStrategy: { swr: 60, ttl: 60 },
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
