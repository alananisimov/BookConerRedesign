import { User } from "next-auth";

export default interface Book {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  genre: string;
}
export type Review = {
  id: number;
  content: string;
  rating: number;
  bookId: number;
  book: Book;
  userId: string;
  user: User;
};
export type ApiError = {
  error: string;
};
export type CreateReviewData = {
  content: string;
  rating: number;
  userEmail: string;
  bookId: number;
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
        bookId: number;
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
  bookId: number;
  user: User;
}
export type book_plus_reviews_init = ({
  reviews: {
    id: number;
    content: string;
    rating: number;
    bookId: number;
    userEmail: string;
  }[];
} & {
  id: number;
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
    bookId: number;
    userEmail: string;
  }[];
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  genre: string;
}[];
