import getBookById from "src/features/actions/books/getBookByName.server";
import { refreshUserReviews } from "src/features/actions/reviews/refreshUserReviews";
import BookView from "src/entities/Product/BookView";
import NoBooks from "src/entities/Product/NoBooks";
export default async function BookPreview({
  params,
}: {
  params: { slug: string };
}) {
  const { user_reviews, buyed_books } = await refreshUserReviews();

  const selectedBook = await getBookById({ bookName: params.slug });
  return (
    <>
      {selectedBook ? (
        <div className="z-10 h-full -mt-12">
          <BookView
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
