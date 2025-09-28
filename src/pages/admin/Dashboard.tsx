
import { MdEdit, MdDelete } from "react-icons/md";
import { Table } from "../../components/Table";
import { movies, type Movie } from "../../Mocks/movies.mock";

function Dashboard() {
    return (
        <Table<Movie>
            data={movies}
            columns={[
                { key: "title", header: "Movie" },
                { key: "year", header: "Year" },
                {
                    key: "actions",
                    header: "Actions",
                    render: () => (
                        <div className="flex gap-2">
                            <button className="text-black-600 hover:text-blue-800">
                                <MdEdit size={18} />
                            </button>
                            <button className="text-black-600 hover:text-red-800">
                                <MdDelete size={18} />
                            </button>
                        </div>
                    ),
                },
            ]}
        />
    );
}

export default Dashboard;
