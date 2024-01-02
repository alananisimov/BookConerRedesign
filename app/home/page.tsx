import React, { Suspense, useState } from "react";
import type { GetServerSideProps } from "next";
import Layout from "@/app/layout";
import prisma from "@/lib/prisma";
import BookProps from "@/app/models";
import Book from "@/app/models";
import { Card, CardHeader, CardTitle } from "shadcn/components/ui/card";
import { CardContent } from "shadcn/components/ui/card";
import Image from "next/image";
import { Skeleton } from "shadcn/components/ui/skeleton";
import HomeCard from "@/components/home/home_card";
import { ChakraProvider } from "@chakra-ui/react";
import Modal from "@/components/shared/modal";
import ModalOpen from "@/components/home/ModalButton";
import HomeCardLayout, {
  HomeCardLayoutWrapper,
} from "@/components/books/HomeCardLayout";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";

// export const getServerSideProps: GetServerSideProps = async () => {
//   const feed = await prisma.book.findMany({});
//   return {
//     props: { feed },
//   };
// };

// type Props = {
//   feed: Book[];
// };

export default async function Home() {
  const feed: Book[] = await prisma.book.findMany({});
  return (
    <div className=" z-10 w-full px-6 xl:px-0 lg:max-w-screen-xl xl:mx-auto">
      <div className=" text-xl sm:text-2xl flex justify-between">
        <span className="my-auto">❤️ Наши лучшие книги</span>
        <ModalOpen />
      </div>
      <main className="text-black">
        <HomeCardLayoutWrapper feed={feed} />
      </main>
    </div>
  );
}