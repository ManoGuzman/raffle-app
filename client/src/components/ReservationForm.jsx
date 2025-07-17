import React, { useState } from "react";

const ReservationForm = ({ selectedNumbers, onClose, onReservationComplete }) => {
  const [name, setName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/reservas`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: name,
            metodoPago: paymentMethod,
            telefono: paymentMethod === "sinpe" ? phone : null,
            numeros: selectedNumbers,
          }),
        }
      );

      if (!response.ok) throw new Error("Error al reservar");

      const data = await response.json();
      toast.success("Reserva exitosa!");
      onReservationComplete(data);
      onClose();
    } catch (error) {
      toast.error("Ocurrió un error al procesar la reserva.");
      setErrors({ form: "Error en la reserva." });
    } finally {
      setLoading(false);
    }
  };

  return (
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
        />
        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
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
          {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
        </div>
      )}

      {errors.form && <p className="text-red-600 text-sm">{errors.form}</p>}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Procesando..." : `Reservar ${selectedNumbers.length} número(s)`}
      </button>

      <button
        type="button"
        onClick={onClose}
        className="ml-4 text-gray-600 underline"
        disabled={loading}
      >
        Cancelar
      </button>
    </form>
  );
};

export default ReservationForm;
