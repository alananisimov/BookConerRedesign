"use server";
import { authOptions } from "@/app/authOptions";
import Book from "@/app/models";
import prisma, { prismaWithCaching } from "@/lib/prisma";
import { Review } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function refreshUserReviews() {
  let buyed_books: Book[] | undefined = undefined;
  const session = await getServerSession(authOptions);
  let user_reviews: Review[] | undefined = undefined;
  if (session && session.user && session.user.email) {
    const user_req = await prisma.user.findUnique({
      include: {
        Book: true,
      },
      where: {
        email: session.user.email,
      },
    });
    buyed_books = user_req?.Book;
    const user_reviews_req = await prisma.review.findMany({
      where: {
        userEmail: session.user.email,
      },
    });
    user_reviews = user_reviews_req;
  }
  console.log("refreshed");
  return user_reviews;
}
