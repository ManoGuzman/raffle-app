import React from 'react';
import ReservationForm from './ReservationForm';

const ReserveModal = ({ isOpen, onClose, selectedNumbers, onReservationComplete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Reservar Números</h2>
        <ReservationForm
          selectedNumbers={selectedNumbers}
          onClose={onClose}
          onReservationComplete={onReservationComplete}
        />
      </div>
    </div>
  );
};

export default ReserveModal;
