import { IoMdStar } from "react-icons/io";

function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex">
            {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
                    <IoMdStar />
                </span>
            ))}
        </div>
    );
}

export default Stars;