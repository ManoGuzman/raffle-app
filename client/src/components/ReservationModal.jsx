import React, { useState, useEffect } from "react";
import FocusTrap from "focus-trap-react";

const ReservationModal = ({ selectedNumbers, onClose, onConfirm }) => {
  const [name, setName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (paymentMethod === "sinpe") {
      if (!phone.trim()) newErrors.phone = "El teléfono SINPE es obligatorio.";
      else if (!/^\d{8}$/.test(phone.trim()))
        newErrors.phone = "El teléfono SINPE debe tener 8 dígitos.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      // Aquí puedes hacer la llamada al backend o solo pasar datos a onConfirm
      await onConfirm({ name, paymentMethod, phone });
    } catch (error) {
      setErrors({ form: "Error al procesar la reserva." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <FocusTrap>
        <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
          <h2 id="modal-title" className="text-xl font-semibold mb-4">
            Confirmar Reserva
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Nombre</label>
              <input
                className={`w-full p-2 border rounded ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                autoFocus
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Método de Pago</label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={loading}
              >
                <option value="efectivo">Efectivo</option>
                <option value="sinpe">SINPE</option>
              </select>
            </div>

            {paymentMethod === "sinpe" && (
              <div>
                <label className="block text-sm font-medium">Número SINPE</label>
                <input
                  className={`w-full p-2 border rounded ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="8 dígitos"
                  disabled={loading}
                />
                {errors.phone && (
                  <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            )}

            {errors.form && <p className="te
