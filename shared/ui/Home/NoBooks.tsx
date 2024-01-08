"use client";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "shadcn/components/ui/skeleton";
export default function NoBooks() {
    return(
        <>
        <div className="flex flex-col rounded-lg bg-white sm:flex-row border max-w-md mx-auto my-auto">
             <Skeleton className="mx-auto">
               <Image
                 className="m-2 h-56 w-auto rounded-md object-cover object-center"
                 src="/NoBook.svg"
                 alt="No cart items"
                 height={96}
                 priority={true}
                 width={96}
               />
             </Skeleton>
             <div className="flex w-full flex-col px-4 py-4 justify-center text-center text-xl">
               <span className="font-semibold">К сожалению таких книг нет 😞</span>
             </div>
           </div>
        </>
    )
}