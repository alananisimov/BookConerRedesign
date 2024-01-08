"use client";
import HomeCard from "../../shared/ui/Home/ProductCard";
import { motion } from "framer-motion";
import { Provider, useSelector } from "react-redux";
import { RootState } from "@/app/store/rootReducer";
import store from "@/app/store/store";
import { book_plus_reviews } from "@/app/models";
import AdminHomeCard from "./Admin/AdminHomeCard";
import getUserRole from "@/app/actions/users/getUserRole";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import getBooksFeed from "@/app/actions/books/getBooksFeed.server";
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
  const [updatedFeed, setUpdatedFeed] = useState(feed);
  const filters = useSelector((state: RootState) => state.filter.items);
  const filteredBooks: book_plus_reviews = updatedFeed.filter((book) =>
    filters.includes(book.genre)
  );
  const [isAdmin, setAdmin] = useState(false);
  async function getRole() {
    const ses = await getSession();
    if (!ses || !ses.user || !ses.user.email) {
      setAdmin(false);
    } else {
      const currentRole = await getUserRole(ses.user.email);
      console.log(currentRole);
      setAdmin(currentRole === "Admin" ? true : false);
    }
  }
  async function updateFeed() {
    const new_feed = await getBooksFeed();
    setUpdatedFeed(new_feed);
  }
  useEffect(() => {
    getRole();
    updateFeed();

    console.log(filteredBooks, feed);
  }, []);

  return (
    <>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-16 gap-6 mt-4">
        {filteredBooks.length > 0 && (
          <>
            {filteredBooks.map((book) => (
              <HomeCard book={book} key={book.id} />
            ))}
            {isAdmin && <AdminHomeCard />}
          </>
        )}
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
