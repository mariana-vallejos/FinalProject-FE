import { FaStar, FaRegStar } from "react-icons/fa";
import { i18n } from "../i18n";
interface RatingBadgeProps {
  rating: number;
  maxRating?: number;
}

function RatingBadge({ rating, maxRating = 5 }: RatingBadgeProps) {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < maxRating; i++) {
      stars.push(
        i < fullStars ? (
          <FaStar key={i} className="w-4 h-4 text-primary" />
        ) : (
          <FaRegStar key={i} className="w-4 h-4 text-white/50" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="bg-raiting text-white rounded-2xl px-6 py-4 text-center shadow-lg min-w-[100px]">
      <p className="text-xs font-semibold mb-1 tracking-wide">
        {i18n.moviePage.raiting}
      </p>
      <p className="text-4xl font-bold mb-2">{rating.toFixed(1)}</p>
      <div className="flex justify-center gap-1">{renderStars()}</div>
    </div>
  );
}

export default RatingBadge;
