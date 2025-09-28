import { MdEdit, MdDelete } from "react-icons/md";
import { Table } from "../../components/Table";
import { movies, type Movie } from "../../Mocks/movies.mock";

function Dashboard() {
  return (
    <div className="min-h-screen bg-primary-bg px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-title text-3xl font-bold text-gray-800">
          Movie Management
        </h1>
        <button
            onClick={() => console.log("Aca se renderiza para añadir movie")}
            className="bg-primary hover:bg-blue-500 text-white px-6 py-2 rounded-3xl rounded-lg shadow transition-colors"
        >
          Add New Movie
        </button>
      </div>

      <div>
        <Table<Movie>
          data={movies}
          columns={[
            { key: "title", header: "Movie" },
            { key: "year", header: "Year" },
            {
              key: "actions",
              header: "Actions",
              render: () => (
                <div className="flex justify-center gap-4">
                    <button 
                        onClick={() => console.log("Aca se renderiza para editar")}
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        <MdEdit size={20} />
                    </button>
                    <button
                        onClick={() => console.log("Aca se renderiza para eliminar")}
                        className="text-gray-500 hover:text-red-600 transition-colors"
                    >
                        <MdDelete size={20} />
                    </button>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Dashboard;
