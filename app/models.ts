import { User } from "next-auth";

export default interface Book {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rate: number;
  count: number;
  userEmail: String;
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
  userId: string;
  bookId: number;
};
