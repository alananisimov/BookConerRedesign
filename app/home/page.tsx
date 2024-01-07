import React from "react";
import prisma, { prismaWithCaching } from "@/lib/prisma";
import ModalOpen from "@/components/home/ModalButton";
import { HomeCardLayoutWrapper } from "@/components/books/HomeCardLayout";
import getBooksFeed from "../actions/books/getBooksFeed.server";
import Loading from "../loading";

export default async function Home() {
  const updatedFeed = await getBooksFeed();
  console.log(123);
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
