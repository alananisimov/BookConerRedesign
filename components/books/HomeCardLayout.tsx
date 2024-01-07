"use client";
import HomeCard from "../home/home_card";
import { motion } from "framer-motion";
import { Provider, useSelector } from "react-redux";
import { RootState } from "@/app/redux/rootReducer";
import store from "@/app/redux/store";
import { book_plus_reviews } from "@/app/models";
import Loading from "@/app/loading";
interface args {
  feed: book_plus_reviews;
}
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
  },
};
export function HomeCardLayoutWrapper({ feed }: args) {
  return (
    <Provider store={store}>
      <HomeCardLayout feed={feed} />
    </Provider>
  );
}
export default function HomeCardLayout({ feed }: args) {
  const filters = useSelector((state: RootState) => state.filter.items);
  const filteredBooks: book_plus_reviews = feed.filter((book) =>
    filters.includes(book.genre)
  );
  return (
    <>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-16 gap-6 mt-4">
        {filteredBooks.length > 0 &&
          filteredBooks.map((book) => <HomeCard book={book} key={book.id} />)}
      </div>
      {filteredBooks.length === 0 && (
        <div className="h-full">
          <h1 className="text-xl my-auto text-center">
            К сожалению у нас нет таких книг 😔
          </h1>
        </div>
      )}
    </>
  );
}
