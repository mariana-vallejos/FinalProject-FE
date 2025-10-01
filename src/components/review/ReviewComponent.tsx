import { MdDelete, MdEdit } from "react-icons/md";
import type { ReviewWithUser } from "../../domain/Review";
import { lazy, useState } from "react";
import ReviewTags from "./ReviewTags";
import Stars from "../Stars";
import { formatDate } from "../../utils/formatDate";

const DeleteReviewModal = lazy(() => import('../ConfirmModal'))

type ReviewComponentProps = {
  review: ReviewWithUser;
  readonly: boolean;
  bgColor?: string;
};

const ReviewComponent = ({ review, readonly, bgColor = '#fff' }: ReviewComponentProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    console.log('delete')
    setIsDeleteModalOpen(false)
    
  }

  const handleCancel = () => {
    setIsDeleteModalOpen(false)
  }

  return (
    <article key={review.id} className={`py-3 px-5 relative bg-[${bgColor}] dark:bg-gray-600`}>
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
            onClick={() => setIsDeleteModalOpen(true)}
            className="text-red-600"
            aria-label="Delete review"
          >
            <MdDelete size={20} />
          </button>
        </div>
      )}

      <DeleteReviewModal isOpen={isDeleteModalOpen} onCancel={handleCancel} onConfirm={handleDelete} message="Are you sure to delete this review? You can't undone this action." title="Delete Review" />

      <div className="flex gap-3 pb-3">
        <img
          src={review.user?.avatar || ''}
          alt={review.user?.name || ''}
          className="rounded-4xl h-12"
        />
        <div>
          <h5 className="font-semibold text-[16px]">{review.user?.name}</h5>
          <p className="text-sm font-medium text-gray-400">{formatDate(review.createdAt)}</p>
        </div>
      </div>
      <Stars rating={review.rating} editable={false} />
      <p className="py-3 font-light text-sm dark:text-gray-300">{review.text}</p>
      {
        review.tags && <ReviewTags tags={review.tags}/>
      }
    </article>
  );
};

export default ReviewComponent;
