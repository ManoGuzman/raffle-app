import React, { createContext, useState, useContext } from 'react';

const ReservationContext = createContext();

export function ReservationProvider({ children }) {
  const [reservedNumbers, setReservedNumbers] = useState([]);
  const [userData, setUserData] = useState({ name: '', phone: '', email: '' });

  return (
    <ReservationContext.Provider
      value={{ reservedNumbers, setReservedNumbers, userData, setUserData }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  return useContext(ReservationContext);
}
