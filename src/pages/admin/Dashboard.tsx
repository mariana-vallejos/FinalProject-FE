import { MdEdit, MdDelete } from "react-icons/md";
import { Table } from "../../components/Table";
import { useState, lazy, Suspense } from "react";
import Navbar from "../../components/Navbar";
import type { Movie } from "../../domain/Movie";
import { useMovies } from "../../context/MoviesContext";
import LoadingModal from "../../components/LoadingModalFallback";
import { movies } from "../../Mocks/movies.mock";

const AddEditMovieModal = lazy(
  () => import("../../components/AddEditMovieModal/AddEditMovieModal")
);
const ConfirmModal = lazy(() => import("../../components/ConfirmModal"));
const Toast = lazy(() => import('../../components/Toast'))

function Dashboard() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddMovieModalOpen, setisAddMovieModalOpen] = useState(false);
  const [isEditMovieModalOpen, setIsEditMovieModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { state, addMovie, deleteMovie, editMovie } = useMovies();
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState('')

  const handleOpenConfirm = (id: number) => {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    console.log("Delete movie with id:", selectedId);
    if (selectedId != null) {
      await deleteMovie(selectedId);
    }
    setIsDeleteModalOpen(false);
    setSelectedId(null);
    setMessageToast('Movie deleted successfully')
    setShowToast(true)
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="min-h-screen bg-primary-bg dark:bg-gray-700 px-6 py-10">
          <div className="md:flex items-center justify-between mb-6">
            <h2 className="font-title text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Movie Management
            </h2>
            <button
              onClick={() => {
                setisAddMovieModalOpen(true);
              }}
              className="btn-primary"
              aria-label="Add new movie"
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
                        onClick={() => {
                          setIsEditMovieModalOpen(true);
                          setSelectedId(row.id);
                        }}
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                        aria-label={`Edit ${row.title}`}
                      >
                        <MdEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleOpenConfirm(row.id)}
                        className="text-gray-500 hover:text-red-600 transition-colors"
                        aria-label={`Delete ${row.title}`}
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  ),
                },
              ]}
            />
            <Suspense
              fallback={
                <LoadingModal label="Opening Confirm Delete Modal..." />
              }
            >
              <ConfirmModal
                isOpen={isDeleteModalOpen}
                title="Delete movie"
                message="Are you sure to delete this movie? This action can't be undone."
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={handleDelete}
                onCancel={() => setIsDeleteModalOpen(false)}
              />
            </Suspense>
          </div>
        </div>
      </div>

      {isAddMovieModalOpen && (
        <Suspense
          fallback={<LoadingModal label="Opening Add Modie Modal..." />}
        >
          <AddEditMovieModal
            open={isAddMovieModalOpen}
            onClose={() => setisAddMovieModalOpen(false)}
            onSubmit={async (input) => {
              await addMovie(input);
              setisAddMovieModalOpen(false);
            }}
          />
        </Suspense>
      )}

      {isEditMovieModalOpen && (
        <Suspense
          fallback={<LoadingModal label="Opening Edit Modie Modal..." />}
        >
          <AddEditMovieModal
            open={isEditMovieModalOpen}
            initial={state.movies.find((movie) => movie.id === selectedId)}
            editable={true}
            onClose={() => setIsEditMovieModalOpen(false)}
            onEdit={async (input) => {
              await editMovie(input);
              setIsEditMovieModalOpen(false);
            }}
          />
        </Suspense>
      )}

      {showToast && (
        <Toast
          message={messageToast}
          type="success"
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}

export default Dashboard;
