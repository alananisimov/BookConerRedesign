import { LoadingDots } from "@/components/shared/icons";

// AddToCartButton.tsx
interface AddToCartButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  isLoading,
  onClick,
}) => (
  <button
    disabled={isLoading}
    className={`${
      isLoading
        ? "cursor-not-allowed mt-4 flex w-full items-center justify-center rounded-full border border-transparent bg-blue-600 px-8 h-12 text-base font-medium text-white"
        : "mt-4 flex w-full items-center justify-center rounded-full border border-transparent bg-blue-600 px-8 h-12 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    } `}
    onClick={onClick}
  >
    {isLoading ? (
      // LoadingDots component
      <LoadingDots color="#ffffff" />
    ) : (
      <>Добавить в корзину</>
    )}
  </button>
);

export default AddToCartButton;
