import { MdEdit, MdDelete } from "react-icons/md";
import { Table } from "../../components/Table";
import { useState, lazy, Suspense } from "react";
import ConfirmModal from "../../components/ConfirmModal";
import Navbar from "../../components/Navbar";
import type { Movie } from "../../domain/Movie";
import { movies } from "../../Mocks/movies.mock";
import AddEditMovieModal from "../../components/AddEditMovieModal";
import { useMovies } from "../../context/MoviesContext";
import LoadingModal from "../../components/LoadingModalFallback";

function Dashboard() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModieModalOpen, setIsAddModieModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const {state, addMovie, deleteMovie} = useMovies();

  const handleOpenConfirm = (id: number) => {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    console.log("Delete movie with id:", selectedId);
    // delete movie logic here
    setIsDeleteModalOpen(false);
    setSelectedId(null);
  };
  
  return (
    <>
    <div>
      <Navbar/>
      <div className="min-h-screen bg-primary-bg px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-title text-3xl font-bold text-gray-800">
            Movie Management
          </h1>
          <button
            onClick={() => {
              setIsAddModieModalOpen(true);
              import("../../components/AddEditMovieModal");
            }}
            className="bg-primary hover:bg-blue-500 text-white px-6 py-2 rounded-3xl shadow transition-colors"
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
                render: (row) => (
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => console.log("Aca se renderiza para editar")}
                      className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <MdEdit size={20} />
                    </button>
                    <button
                      onClick={() =>
                        handleOpenConfirm(row.id)
                      }
                      className="text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                ),
              },
            ]}
          />
          <ConfirmModal
            isOpen={isDeleteModalOpen}
            title="Delete movie"
            message="Are you sure to delete this movie? This action can't be undone."
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={handleDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        </div>
      </div>
      
    </div>
    {isAddModieModalOpen && (
      <Suspense fallback={<LoadingModal label="Opening Add Modie Modal..."/>}>
        <AddEditMovieModal
          open={isAddModieModalOpen}
          onClose={() => setIsAddModieModalOpen(false)}
          onSubmit={async (input) => {
            await addMovie(input);
            setIsAddModieModalOpen(false);
          }}
        />
      </Suspense>
    )}
    </>
  );
}

export default Dashboard;
