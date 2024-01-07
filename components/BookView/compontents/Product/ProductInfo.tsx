import { StarIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { ReactNode } from "react";
import DescriptionDetails from "./DescriptionDetails";
import AddToCartButton from "./AddToCartButton";

// ProductInfo.tsx
interface ProductInfoProps {
  price: string;
  reviews: { href: string; average: number; totalCount: number };
  description: string;
  showFullDescription: boolean;
  onToggleDescription: () => void;
  isLoading: boolean;
  onAddButtonClick: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  price,
  reviews,
  description,
  onToggleDescription,
  showFullDescription,
  isLoading,
  onAddButtonClick,
}) => (
  <div className="mt-4 lg:row-span-3 lg:mt-0">
    <h2 className="sr-only">Product information</h2>
    <p className="text-3xl tracking-tight text-gray-900">{price} RUB</p>

    <div className="mt-6">
      <h3 className="sr-only">Reviews</h3>
      <div className="flex items-center">
        <div className="flex items-center">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              className={classNames(
                reviews.average > rating ? "text-gray-900" : "text-gray-200",
                "h-5 w-5 flex-shrink-0"
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="sr-only">{reviews.average} out of 5 stars</p>
        <a
          href={reviews.href}
          className="ml-3 text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          {reviews.totalCount}{" "}
          {reviews.totalCount == 1
            ? "отзыв"
            : reviews.totalCount >= 5
              ? "отзывов"
              : "отзыва"}
        </a>
      </div>
      <DescriptionDetails
        description={description}
        showFullDescription={showFullDescription}
        onToggleDescription={onToggleDescription}
      />
      <AddToCartButton isLoading={isLoading} onClick={onAddButtonClick} />
    </div>
  </div>
);

export default ProductInfo;
