import React from "react";
import ModalOpen from "src/shared/ui/Home/ModalButton";
import { HomeCardLayoutWrapper } from "src/widgets/Home/HomeCardLayout";
import getBooksFeed from "../../features/actions/books/getBooksFeed.server";

export default async function Home() {
  const updatedFeed = await getBooksFeed();
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
