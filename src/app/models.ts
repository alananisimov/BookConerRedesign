import { User } from "next-auth";

export default interface Book {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  genre: string;
}
export type Review = {
  id: string;
  content: string;
  rating: number;
  bookId: string;
  book: Book;
  userId: string;
  user: User;
};
export type Review_plus_user =
  | ({
      user: {
        id: string;
        name: string | null;
        email: string | null;
        emailVerified: Date | null;
        role: string;
        image: string | null;
      };
    } & {
      id: number;
      content: string;
      rating: number;
      bookId: string;
      userEmail: string;
    }[])
  | undefined;

export type ApiError = {
  error: string;
};
export type CreateReviewData = {
  content: string;
  rating: number;
  userEmail: string;
  bookId: string;
};
export type CreateBookData = {
  description: string;
  title: string;
  price: number;
  image: string;
  category: string;
  genre: string;
};
export type AddBuyedBookData = {
  Book: Book;
  userId: string;
};
export interface ReviewResponse {
  reviews:
    | {
        id: number;
        content: string;
        rating: number;
        bookId: string;
        user: User;
      }[]
    | [];
  totalCount: number;
  averageRating: number;
}
export interface ReviewWithUser {
  id: number;
  content: string;
  rating: number;
  bookId: string;
  user: User;
}
export type book_plus_reviews_init = ({
  reviews: {
    id: number;
    content: string;
    rating: number;
    bookId: string;
    userEmail: string;
  }[];
} & {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  genre: string;
})[];
export type book_plus_reviews = {
  averageRating: number;
  reviews: {
    id: number;
    content: string;
    rating: number;
    bookId: string;
    userEmail: string;
  }[];
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  genre: string;
}[];
