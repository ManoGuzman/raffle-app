import React from "react";
import DigitalActionPDF from "./DigitalActionPDF";

const PaymentConfirmation = ({ name, paymentMethod, phone, numeros, onClose }) => (
  <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
    <h2 className="text-xl font-bold mb-4">¡Reserva Confirmada!</h2>
    <p><strong>Nombre:</strong> {name}</p>
    <p><strong>Método de Pago:</strong> {paymentMethod}</p>
    {paymentMethod === "sinpe" && <p><strong>Teléfono SINPE:</strong> {phone}</p>}
    <p><strong>Números reservados:</strong> {numeros.join(", ")}</p>

    <DigitalActionPDF reservationData={{ name, paymentMethod, phone, numeros }} />

    <button
      onClick={onClose}
      className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
    >
      Cerrar
    </button>
  </div>
);

export default PaymentConfirmation;
