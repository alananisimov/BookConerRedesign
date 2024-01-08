import { truncate } from "@/app/lib/utils";

interface DescriptionDetailsProps {
  description: string;
  showFullDescription: boolean;
  onToggleDescription: () => void;
}

const DescriptionDetails: React.FC<DescriptionDetailsProps> = ({
  description,
  showFullDescription,
  onToggleDescription,
}) => (
  <div className="py-6 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
    <div>
      <h3 className="">Описание:</h3>

      <div className="">
        <p className="text-base text-gray-900 overflow-hidden text-pretty">
          {showFullDescription ? description : `${truncate(description, 200)}`}
        </p>
        {!showFullDescription && (
          <button
            className="text-gray-900 hover:underline font-bold"
            onClick={onToggleDescription}
          >
            ...ещё
          </button>
        )}
      </div>
    </div>
  </div>
);

export default DescriptionDetails;
