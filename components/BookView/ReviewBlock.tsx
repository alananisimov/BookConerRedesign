export default function ReviewBlock({
  reviews,
}: {
  reviews:
    | {
        id: number;
        content: string;
        rating: number;
        bookId: number;
        userId: string;
      }[]
    | [];
}) {
  return (
    <>
      {!reviews.length ? (
        <div>
          <h1 className="text-2xl font-medium">Пока что отзывов нет 😔</h1>
          <p>Мы надеемся что вы станете первым покупетелем данной книги!</p>
        </div>
      ) : (
        <div>{reviews.map((el) => el.content)}</div>
      )}
    </>
  );
}
