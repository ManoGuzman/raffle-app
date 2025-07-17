import React from "react";
import { jsPDF } from "jspdf";

const DigitalActionPDF = ({ reservationData }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Comprobante de Reserva - Rifa Iglesia", 20, 20);

    doc.setFontSize(12);
    doc.text(`Nombre: ${reservationData.name}`, 20, 40);
    doc.text(`Método de Pago: ${reservationData.paymentMethod}`, 20, 50);
    if (reservationData.paymentMethod === "sinpe") {
      doc.text(`Teléfono SINPE: ${reservationData.phone}`, 20, 60);
    }
    doc.text(
      `Números reservados: ${reservationData.numeros.join(", ")}`,
      20,
      70
    );
    doc.text(
      `Fecha: ${new Date().toLocaleString()}`,
      20,
      80
    );

    doc.save(`Reserva_Rifa_${reservationData.name}.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Descargar acción digital (PDF)
    </button>
  );
};

export default DigitalActionPDF;
