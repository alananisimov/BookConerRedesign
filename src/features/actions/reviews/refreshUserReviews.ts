"use server";
import { authOptions } from "src/app/lib/configuration";
import prisma, { prismaWithCaching } from "src/app/lib/prisma";
import { getServerSession } from "next-auth";

export async function refreshUserReviews() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
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
    prisma.review.findMany({
      where: {
        userEmail: session.user.email,
      },
    }),
  ]);

  const buyed_books = user_req?.Book;
  const user_reviews = user_reviews_req;
  return { user_reviews, buyed_books };
}
