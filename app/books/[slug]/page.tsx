import getBookById from "@/app/actions/books/getBookById.server";
import { refreshUserReviews } from "@/app/actions/reviews/refreshUserReviews";
import { authOptions } from "@/app/authOptions";
import Book from "@/app/models";
import BookView, { BookViewWrapper } from "@/components/BookView/BookView";
import NoBooks from "@/components/books/NoBooks";
import prisma, { prismaWithCaching } from "@/lib/prisma";
import { Review } from "@prisma/client";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
export default async function BookPreview({
  params,
}: {
  params: { slug: string };
}) {
  const { user_reviews, buyed_books } = await refreshUserReviews();
  const selectedBook = await getBookById({ bookId: params.slug });
  return (
    <>
      {selectedBook ? (
        <div className="z-10 h-full -mt-12">
          <BookViewWrapper
            product={selectedBook}
            buyed_books={buyed_books}
            user_reviews={user_reviews}
          />
        </div>
      ) : (
        <div className="z-10  px-6 xl:px-0 lg:max-w-screen-xl xl:mx-auto my-auto ">
          <div className="">
            <NoBooks />
          </div>
        </div>
      )}
    </>
  );
}
