import { useNavigate } from "react-router";
import { i18n } from "../../i18n";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6 dark:bg-gray-800">
      <h1 className="text-6xl font-bold text-gray-800 mb-4 dark:text-gray-100">{i18n.notFoundPage.error}</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2 dark:text-gray-200">{i18n.notFoundPage.notFound}</h2>
      <p className="text-gray-500 mb-6 dark:text-gray-400">
        {i18n.notFoundPage.notFoundMessage}
      </p>
      <button
        onClick={() => navigate("/")}
        className="btn-primary dark:hover:text-white"
      >
        {i18n.moviePage.back}
      </button>
    </div>
  );
}

export default NotFoundPage;
