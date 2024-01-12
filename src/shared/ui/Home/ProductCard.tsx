"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Card, CardContent } from "src/shared/ui/shadcn/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import { Badge } from "src/shared/ui/shadcn/components/ui/badge";
import Link from "next/link";
import { book_plus_reviews } from "src/app/models";
import React from "react";
import { Button } from "src/shared/ui/shadcn/components/ui/button";
import deleteBook from "src/features/actions/books/deleteBook.server";
import { toast } from "sonner";
import { del } from "@vercel/blob";
import { truncate } from "src/app/lib/utils";
interface props {
  book: book_plus_reviews[0];
  isAdmin: boolean;
  updateFeed: () => Promise<void>;
}

export default function HomeCard({ book, isAdmin, updateFeed }: props) {
  async function deleteBookReq() {
    const req = await deleteBook(book.id);
    console.log(req);
    if (req) {
      updateFeed();
      await del(req.image, {
        token: "vercel_blob_rw_M8q0hKg7wGVJOfBX_y1xXDaixXou8Sj0BU3kBA8tewNurTL",
      });
      toast(`Вы успешно удалили книгу ${req.title}`);
    } else
      toast(
        `Не удалось удалить товар под названием ${truncate(book.title, 20)}`
      );
  }

  return (
    <Link href={`/books/${book.title}`}>
      <Card
        className={
          " hover:scale-105 transition-all overflow-hidden bg-transparent"
        }
      >
        <CardContent className="grid">
          <Image
            src={book.image}
            alt={book.title}
            priority
            loading="eager"
            sizes="132px"
            width={200}
            height={200}
            className=" z-0 h-56 w-auto object-cover rounded-md mt-2"
          />

          <div className="mt-3">
            <Badge
              className="text-xs font-semibold px-2.5 py-0.5"
              variant={"outline"}
            >
              {book.category}
            </Badge>
            <div className="mt-2 font-semibold leading-tight text-ellipsis text-wrap line-clamp-1 break-words">
              {book.title}
            </div>

            <div>
              Цена: {book.price}
              <div className="text-gray-600 text-sm mt-2"></div>
            </div>

            <div className="mt-2 flex gap-x-2">
              {book.averageRating > 0 && (
                <div className="inline-flex my-auto">
                  {Array(Math.round(book.averageRating))
                    .fill("")
                    .map((_, i) => (
                      <Star key={i} className="w-3" />
                    ))}
                </div>
              )}
              <div className=" text-gray-600 text-sm my-auto">
                {book.reviews.length}{" "}
                {book.reviews.length === 1
                  ? "отзыв"
                  : book.reviews.length >= 5
                    ? "отзывов"
                    : "отзыва"}
              </div>
              <div className="ml-auto">
                {isAdmin && (
                  <Link href={""}>
                    <Button
                      variant={"outline"}
                      className="bg-transparent"
                      onClick={() => deleteBookReq()}
                    >
                      Удалить
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
