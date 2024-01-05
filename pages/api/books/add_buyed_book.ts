import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import {
  AddBuyedBookData,
  ApiError,
  CreateReviewData,
  Review,
} from "@/app/models";

interface AddBookRequest extends NextApiRequest {
  body: string;
}

export default async function handler(
  req: AddBookRequest,
  res: NextApiResponse<any | ApiError>
) {
  if (req.method !== "POST") {
    return res.status(500).json({ error: "Ошибка при покупке книги!" });
  }

  let requestBody: AddBuyedBookData;

  try {
    requestBody = JSON.parse(req.body);
  } catch (error) {
    return res.status(400).json({ error: "Invalid JSON in the request body" });
  }

  const { Book, userId } = requestBody;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    const existedBooks = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        Book: true,
      },
    });
    if (existedBooks?.Book) {
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          Book: {
            set: [...existedBooks.Book, Book],
          },
        },
      });
      return res.status(202).json(updatedUser);
    } else {
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          Book: {
            set: [Book],
          },
        },
      });
      return res.status(202).json(updatedUser);
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Ошибка при обновлении данных пользователя" });
  }
}
