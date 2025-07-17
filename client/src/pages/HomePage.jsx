import React, { useEffect, useState } from "react";
import NumberGrid from "../components/NumberGrid";
import ReservationModal from "../components/ReservationModal";
import PaymentConfirmation from "../components/PaymentConfirmation";
import { fetchNumbers } from "../services/api";
import { useReservation } from "../context/ReservationContext";

const HomePage = () => {
  const [numbers, setNumbers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const {
    selectedNumbers,
    toggleNumber,
    reservationData,
    saveReservation,
    resetReservation,
  } = useReservation();

  useEffect(() => {
    loadNumbers();
  }, []);

  const loadNumbers = async () => {
    const data = await fetchNumbers();
    setNumbers(data);
  };

  const handleOpenModal = () => {
    if (selectedNumbers.length > 0) {
      setShowModal(true);
    } else {
      alert("Por favor seleccione al menos un número antes de reservar.");
    }
  };

  const handleConfirmReservation = async (data) => {
    // Aquí haces la llamada al backend, por ejemplo:
    // await api.post('/reservas', { ...data, numeros: selectedNumbers });

    // Guardamos localmente la info para mostrar confirmación y PDF
    saveReservation({
      name: data.name,
      paymentMethod: data.paymentMethod,
      phone: data.phone,
      numeros: selectedNumbers,
    });
    setShowModal(false);
    loadNumbers(); // refresca la lista para mostrar cambios si es necesario
  };

  const handleCloseConfirmation = () => {
    resetReservation();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Rifa de la Iglesia 🎟️</h1>

      <NumberGrid
        numbers={numbers}
        selectedNumbers={selectedNumbers}
        toggleNumber={toggleNumber}
      />

      <div className="flex justify-center mt-4">
        <button
          onClick={handleOpenModal}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Reservar seleccionados ({selectedNumbers.length})
        </button>
      </div>

      {showModal && (
        <ReservationModal
          selectedNumbers={selectedNumbers}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmReservation}
        />
      )}

      {reservationData && (
        <PaymentConfirmation {...reservationData} onClose={handleCloseConfirmation} />
      )}
    </div>
  );
};

export default HomePage;
