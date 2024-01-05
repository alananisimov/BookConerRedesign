"use client";

import { useState } from "react";
import { Card, CardContent } from "shadcn/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import { Badge } from "shadcn/components/ui/badge";
import Link from "next/link";
import { book_plus_reviews } from "@/app/home/page";
interface props {
  book: book_plus_reviews[0];
}
export default function HomeCard({ book }: props) {
  const [isLoaded, setLoaded] = useState(Boolean);
  return (
    <Link href={`/books/${book.id}`}>
      <Card className=" hover:scale-105 transition-all">
        <CardContent className="grid">
          <Image
            src={book.image}
            alt={book.title}
            priority={true}
            width={"200"}
            height={"200"}
            className="group-hover:blur-sm z-0 h-56 w-auto"
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
                <div className="inline-flex">
                  {Array(Math.round(book.averageRating))
                    .fill("")
                    .map((_, i) => (
                      <Star key={i} className="w-3" />
                    ))}
                </div>
              )}
              <div className=" text-gray-600 text-sm my-auto">
                {book.reviews.length}{" "}
                {book.reviews.length == 1
                  ? "отзыв"
                  : book.reviews.length >= 5
                    ? "отзывов"
                    : "отзыва"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
