import { authOptions } from "@/app/authOptions";
import Book from "@/app/models";
import BookView, { BookViewWrapper } from "@/components/BookView/BookView";
import NoBooks from "@/components/books/NoBooks";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
export default async function BookPreview({
  params,
}: {
  params: { slug: string };
}) {
  let selectedBook = await prisma.book.findFirst({
    where: {
      id: parseInt(params.slug) || 666,
    },
  });
  console.log(selectedBook);
  let buyed_books: Book[] | undefined = undefined;
  const session = await getServerSession(authOptions);
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
  }
  return (
    <>
      {selectedBook ? (
        <div className="z-10 h-full -mt-12">
          <BookViewWrapper product={selectedBook} buyed_books={buyed_books} />
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
