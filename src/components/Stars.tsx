import { useState, useRef } from "react";
import { IoMdStar, IoMdStarHalf } from "react-icons/io";

type StarsProps = {
  rating: number;
  editable?: boolean;
  onChange?: (value: number) => void;
  size?: number;
  color?: string;
};

function Stars({ rating, editable = false, onChange, size = 24, color= "#006289" }: StarsProps) {
  const [hover, setHover] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayRating = hover !== null ? hover : rating;

  const handleClick = (event: React.MouseEvent, index: number) => {
    if (!editable || !onChange) return;

    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;

    const value = x < rect.width / 2 ? index + 0.5 : index + 1;
    onChange(value);
  };

  const handleMouseMove = (event: React.MouseEvent, index: number) => {
    if (!editable) return;
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const value = x < rect.width / 2 ? index + 0.5 : index + 1;
    setHover(value);
  };

  const handleMouseLeave = () => {
    if (!editable) return;
    setHover(null);
  };

  return (
    <div
      ref={containerRef}
      className="flex"
      role={editable ? "slider" : "img"}
      aria-label={editable ? "Rating" : `Rating: ${rating} stars`}
      aria-valuemin={editable ? 0 : undefined}
      aria-valuemax={editable ? 5 : undefined}
      aria-valuenow={editable ? rating : undefined}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const fullStarValue = i + 1;
        const halfStarValue = i + 0.5;

        let starIcon;
        if (displayRating >= fullStarValue) {
          starIcon = <IoMdStar size={size} color={color}/>;
        } else if (displayRating >= halfStarValue) {
          starIcon = <IoMdStarHalf size={size} color={color}/>;
        } else {
          starIcon = <IoMdStar size={size} className="text-gray-300" />;
        }

        return (
          <button
            key={i}
            type="button"
            onClick={(e) => handleClick(e, i)}
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={handleMouseLeave}
            disabled={!editable}
            aria-label={`${i + 1} star${i + 1 > 1 ? "s" : ""}`}
          >
            {starIcon}
          </button>
        );
      })}
    </div>
  );
}

export default Stars;
