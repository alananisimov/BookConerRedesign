"use client";

import { useState } from "react";
import { Card, CardContent } from "shadcn/components/ui/card";
import Image from "next/image";
import Book from "@/app/models";
import { Star } from "lucide-react";
import { Badge } from "shadcn/components/ui/badge";
import Link from "next/link";
interface props {
  book: Book;
}
export default function HomeCard({ book }: props) {
  const [isLoaded, setLoaded] = useState(Boolean);
  return (
    <Link href={`/books/${book.id}`}>
      <Card className=" group hover:cursor-pointer">
        <CardContent className="grid">
          <Image
            src={book.image}
            alt={book.title}
            priority={true}
            width={"200"}
            height={"200"}
            className="group-hover:blur-sm z-0"
          />
          <div className="mt-3">
            <Badge
              className="text-xs font-semibold px-2.5 py-0.5"
              variant={"outline"}
            >
              {book.category}
            </Badge>
            <div className="mt-2 font-semibold leading-tight">{book.title}</div>

            <div>
              Цена: {book.price}
              <div className="text-gray-600 text-sm mt-2"></div>
            </div>

            <div className="mt-2 flex">
              {Array(Math.round(book.rate))
                .fill("")
                .map((_, i) => (
                  <Star key={i} className="w-3" />
                ))}

              <div className="ml-2 text-gray-600 text-sm my-auto">
                {book.count} отзывов
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
