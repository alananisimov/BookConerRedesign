import React from "react";
import prisma from "@/lib/prisma";
import ModalOpen from "@/components/home/ModalButton";
import { HomeCardLayoutWrapper } from "@/components/books/HomeCardLayout";
export type book_plus_reviews_init = ({
  reviews: {
    id: number;
    content: string;
    rating: number;
    bookId: number;
    userEmail: string;
  }[];
} & {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rate: number;
  count: number;
  genre: string;
})[];
export type book_plus_reviews = {
  averageRating: number;
  reviews: {
    id: number;
    content: string;
    rating: number;
    bookId: number;
    userEmail: string;
  }[];
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rate: number;
  count: number;
  genre: string;
}[];

export default async function Home() {
  const feed: book_plus_reviews_init = await prisma.book.findMany({
    include: {
      reviews: true,
    },
    cacheStrategy: { ttl: 60 },
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
  return (
    <div className=" z-10 w-full px-6 xl:px-0 lg:max-w-screen-xl xl:mx-auto">
      <div className=" text-xl sm:text-2xl flex justify-between">
        <span className="my-auto">❤️ Наши лучшие книги</span>
        <ModalOpen />
      </div>
      <main className="text-black">
        <HomeCardLayoutWrapper feed={updatedFeed} />
      </main>
    </div>
  );
}
