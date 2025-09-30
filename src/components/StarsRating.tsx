import { type FC } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarsRatingProps {
  rating: number; 
  setRating?: (rating: number) => void; 
  size?: number; 
  readOnly?: boolean; 
}

const StarsRating: FC<StarsRatingProps> = ({
  rating,
  setRating,
  size = 18,
  readOnly = false,
}) => {
  const renderStar = (index: number) => {
    const starValue = index + 1;

    if (rating >= starValue) {
      return <FaStar size={size} color="#006289" />;
    } else if (rating >= starValue - 0.5) {
      return <FaStarHalfAlt size={size} color="#006289" />;
    } else {
      return <FaRegStar size={size} color="#006289" />;
    }
  };

  return (
    <div
      className="flex items-center"
      role={setRating && !readOnly ? "radiogroup" : undefined}
      aria-label="Movie rating"
    >
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, index) => {
          const clickable = !!setRating && !readOnly;

          return (
            <div key={index} className="flex justify-center">
              {clickable ? (
                <button
                  type="button"
                  onClick={() => setRating(index + 1)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setRating(index + 0.5);
                  }}
                  aria-label={`${index + 1} star`}
                  className="p-1"
                >
                  {renderStar(index)}
                </button>
              ) : (
                <span aria-hidden="true">{renderStar(index)}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StarsRating;
