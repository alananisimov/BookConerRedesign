"use server";
import { authOptions } from "@/app/authOptions";
import { prismaWithCaching } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function refreshUserReviews() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    console.log("User not authenticated");
    return { user_reviews: undefined, buyed_books: undefined };
  }

  const [user_req, user_reviews_req] = await Promise.all([
    prismaWithCaching.user.findFirst({
      include: {
        Book: true,
      },
      where: {
        email: session.user.email,
      },
    }),
    prismaWithCaching.review.findMany({
      where: {
        userEmail: session.user.email,
      },
    }),
  ]);

  const buyed_books = user_req?.Book;
  const user_reviews = user_reviews_req;

  console.log("refreshed");
  return { user_reviews, buyed_books };
}
