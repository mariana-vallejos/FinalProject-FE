type ReviewTagsProps = {
    tags: string[]
}

const ReviewTags = ({tags} : ReviewTagsProps) => {
  return (
    <div className="flex flex-wrap gap-1.5">
        {tags?.map((tag, index) => (
          <span
            key={index}
            className="rounded-2xl border border-primary text-primary font-light py-2 px-3 text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
  )
}

export default ReviewTags