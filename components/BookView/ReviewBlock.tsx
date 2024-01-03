import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { motion } from "framer-motion";
import { StarIcon } from "lucide-react";
import Image from "next/image";
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item_style = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
interface args {
  reviews:
    | []
    | {
        id: number;
        content: string;
        rating: number;
        bookId: number;
        user: {
          id: string;
          name: string | null;
          email: string | null;
          emailVerified: Date | null;
          image: string | null;
        };
      }[]
    | undefined;
}

export default function ReviewBlock({ reviews }: args) {
  return (
    <>
      {reviews !== undefined &&
        (!reviews.length ? (
          <div className="px-6">
            <h1 className="text-2xl font-medium">Пока что отзывов нет 😔</h1>
            <p>Мы надеемся что вы станете первым покупетелем данной книги!</p>
          </div>
        ) : (
          <div className=" h-full w-full">
            <h1 className="m-4 font-medium text-xl w-full">Все отзывы</h1>
            <motion.div
              className=" "
              variants={container}
              initial="hidden"
              animate="visible"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 md:gap-3 md:p-5 pt-0 w-full">
                {reviews.map((item) => (
                  <motion.div
                    key={item.id}
                    className="item"
                    variants={item_style}
                  >
                    <div
                      className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent h-full"
                      key={item.id}
                    >
                      <div className="inline-flex w-full gap-x-2">
                        <div className="w-8 h-8">
                          <Image
                            src={
                              item.user.image ||
                              "https://api.dicebear.com/7.x/pixel-art-neutral/svg?backgroundColor=b6e3f4,c0aede,d1d4f9"
                            }
                            width={64}
                            height={64}
                            className="rounded-full"
                            alt="avatar"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center">
                            <div className="flex items-center gap-2">
                              <div className="font-semibold">
                                {item.user.name}
                              </div>
                            </div>
                            <div
                              className={cn(
                                "ml-auto text-xs",
                                "text-foreground"
                              )}
                            ></div>
                          </div>
                          <div className="text-xs font-medium inline-flex gap-x-2">
                            {" "}
                            <div className="">
                              <div className="inline-flex">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                  <StarIcon
                                    key={rating}
                                    className={cn(
                                      item.rating > rating
                                        ? "text-orange-400"
                                        : "text-gray-300",
                                      "h-3.5 w-3.5 flex-shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                ))}
                              </div>
                            </div>{" "}
                            {item.rating + " Баллов"}
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground max-h-24 w-full break-words">
                        {item.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
    </>
  );
}
