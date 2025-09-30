import { useState } from "react";
import Navbar from "../../components/Navbar";
import Toast from "../../components/Toast";
import { i18n } from "../../i18n";
import ReviewComponent from "../../components/ReviewComponent";
import { reviews } from "../../Mocks/reviews.mock";

function Home() {
  const [showToast, setShowToast] = useState(false);
  return (
    <>
      <Navbar />
      <button
        onClick={() => setShowToast(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {i18n.toast.showToast}
      </button>

      <section className="bg-white w-1/2 mx-12">
        <ReviewComponent review={reviews[0]} />
      </section>
      {showToast && (
        <Toast
          message="¡Operación exitosa!"
          type="success"
          duration={2000}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}

export default Home;
