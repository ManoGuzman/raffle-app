import React, { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [reservationData, setReservationData] = useState(null);

  const toggleNumber = (number) => {
    setSelectedNumbers((prev) =>
      prev.includes(number)
        ? prev.filter((n) => n !== number)
        : [...prev, number]
    );
  };

  const saveReservation = (data) => {
    setReservationData(data);
    setSelectedNumbers([]); // Limpiar selección tras reservar
  };

  const resetReservation = () => {
    setReservationData(null);
  };

  return (
    <ReservationContext.Provider
      value={{
        selectedNumbers,
        toggleNumber,
        reservationData,
        saveReservation,
        resetReservation,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => useContext(ReservationContext);
