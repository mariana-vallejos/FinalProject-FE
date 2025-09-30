import type { Review } from "../domain/Review";
import StarsRating from "./StarsRating";

type ReviewComponentProps = {
  review: Review;
};

const ReviewComponent = ({ review }: ReviewComponentProps) => {
  return (
    <article className="py-3 px-5">
      <div className="flex gap-3 pb-3">
        <img
          src={review.user.avatar}
          alt={review.user.name}
          className="rounded-4xl h-12"
        />
        <div>
          <h5 className="font-semibold">{review.user.name}</h5>
          <p className="text-sm text-gray-400">{review.createdAt}</p>
        </div>
      </div>
      <StarsRating rating={3.5} readOnly={true}/>
      <p className="pt-2">{review.text}</p>
    </article>
  );
};

export default ReviewComponent;
