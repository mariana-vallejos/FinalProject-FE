import Navbar from "../../components/Navbar";
import Stars from "../../components/Stars";
import { Table } from "../../components/Table";

type UserReview = {
  user: string;
  movie: string;
  rating: number;
  text?: string;
};

const reviews: UserReview[] = [
  { user: "Alice", movie: "The Discovery", rating: 4, text: "This movie is meh"},
  { user: "Bob", movie: "Silent Night", rating: 5},
];

function ReviewsPage() {
  return (
    <div>
        <Navbar/>
        <div className="min-h-screen bg-primary-bg px-6 py-10">
            <Table<UserReview>
                data={reviews}
                columns={[
                    { key: "user", header: "User" },
                    { key: "movie", header: "Movie" },
                    {
                        key: "rating",
                        header: "Rating",
                        render: (row) => 
                            <div className="flex justify-center">
                                <Stars rating={row.rating}/>
                            </div>
                    },
                    { key: "text", header: "Message" }
                ]}  
            />
        </div>  
    </div>
  );
}

export default ReviewsPage