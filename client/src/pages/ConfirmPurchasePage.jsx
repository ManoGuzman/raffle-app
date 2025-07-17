import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservation } from '../context/ReservationContext';
import { confirmPurchase } from '../services/api';

export default function ConfirmPurchasePage() {
  const { reservedNumbers, userData } = useReservation();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('SINPE');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (reservedNumbers.length === 0) {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (paymentMethod === 'SINPE' && !phone.trim()) {
      setError('Please enter your phone number for SINPE.');
      return;
    }

    setLoading(true);
    try {
      const res = await confirmPurchase({
        numbers: reservedNumbers,
        paymentMethod,
        phone,
        user: userData,
      });
      if (res.success) {
        alert('Purchase confirmed! Thank you.');
        navigate('/');
      } else {
        setError(res.message || 'Purchase failed.');
      }
    } catch {
      setError('Error confirming purchase.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Confirmar Compra</h2>
      <p className="mb-4">Números a comprar: {reservedNumbers.join(', ')}</p>
      <p className="mb-4">
        Cliente: {userData.name} - {userData.phone}
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="paymentMethod" className="block font-semibold mb-1">
            Método de pago
          </label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="SINPE">SINPE (Enviar a teléfono)</option>
            <option value="EFECTIVO">Efectivo</option>
          </select>
        </div>

        {paymentMethod === 'SINPE' && (
          <div>
            <label htmlFor="phoneSINPE" className="block font-semibold mb-1">
              Número de teléfono (SINPE)
            </label>
            <input
              id="phoneSINPE"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Ej: 50688888888"
              required
            />
          </div>
        )}

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Confirmando...' : 'Confirmar Compra'}
        </button>
      </form>
    </div>
  );
}
