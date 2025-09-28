import { useState } from "react";
import Navbar from "../../components/Navbar";
import Toast from "../../components/Toast";

function Home() {
  const [showToast, setShowToast] = useState(false);
  return (
    <>
      <Navbar />
      <button
        onClick={() => setShowToast(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Mostrar Toast
      </button>

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
