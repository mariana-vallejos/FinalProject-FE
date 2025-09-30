import { MdDelete, MdEdit } from "react-icons/md";
import type { Review } from "../domain/Review";
import StarsRating from "./StarsRating";

type ReviewComponentProps = {
  review: Review;
  readonly: boolean;
};

const ReviewComponent = ({ review, readonly }: ReviewComponentProps) => {
  return (
    <article key={review.id} className="py-3 px-5 relative">
      {!readonly && (
        <div className="absolute top-0 right-0 flex md:gap-2 p-2 xl:opacity-0 xl:hover:opacity-100 transition-opacity ">
          <button
            onClick={() => console.log('edit')}
            className="text-blue-600"
            aria-label="Edit review"
          >
            <MdEdit size={20} />
          </button>
          <button
            onClick={() => console.log('delete')}
            className="text-red-600"
            aria-label="Delete review"
          >
            <MdDelete size={20} />
          </button>
        </div>
      )}
      
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
      <StarsRating rating={review.rating} readOnly={true} />
      <p className="py-3 dark:text-gray-300">{review.text}</p>
      <div className="flex flex-wrap gap-1.5">
        {review.tags?.map((tag, index) => (
          <span
            key={index}
            className="rounded-2xl border border-primary text-primary py-2 px-3 text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
};

export default ReviewComponent;
