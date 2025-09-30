import { useState } from "react";
import { IoMdStar } from "react-icons/io";

type StarsProps = {
  rating: number;
  editable?: boolean;
  onChange?: (value: number) => void;
};

function Stars({ rating, editable = false, onChange }: StarsProps) {
  const [hover, setHover] = useState<number | null>(null);

  const handleClick = (value: number) => {
    if (!editable || !onChange) return;
    onChange(value);
  };

  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => {
        const value = i + 1;
        const isActive = hover !== null ? value <= hover : value <= rating;

        return (
          <button
            key={i}
            type="button"
            onClick={() => handleClick(value)}
            onMouseEnter={() => editable && setHover(value)}
            onMouseLeave={() => editable && setHover(null)}
            className={`${
              isActive ? "text-yellow-400" : "text-gray-300"
            } transition-colors`}
            disabled={!editable}
          >
            <IoMdStar size={24} />
          </button>
        );
      })}
    </div>
  );
}

export default Stars;
