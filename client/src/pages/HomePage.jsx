import React, { useEffect, useState } from 'react';
import { getAvailableNumbers } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useReservation } from '../context/ReservationContext';

export default function HomePage() {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setReservedNumbers } = useReservation();
  const [selected, setSelected] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    getAvailableNumbers()
      .then((data) => {
        setNumbers(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load numbers');
        setLoading(false);
      });
  }, []);

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const handleProceed = () => {
    if (selected.size === 0) {
      alert('Please select at least one number.');
      return;
    }
    setReservedNumbers(Array.from(selected));
    navigate('/reserve');
  };

  if (loading) return <p className="text-center mt-10">Loading numbers...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Rifa - Elige tu número</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {numbers.map(({ id, status }) => (
          <div
            key={id}
            onClick={() => status === 'AVAILABLE' && toggleSelect(id)}
            className={`rounded-xl shadow-md p-4 text-center cursor-pointer select-none
              ${
                status === 'AVAILABLE'
                  ? selected.has(id)
                    ? 'bg-blue-400 text-white'
                    : 'bg-green-200 text-green-800 hover:bg-green-300'
                  : status === 'RESERVED'
                  ? 'bg-yellow-200 text-yellow-800 cursor-not-allowed'
                  : 'bg-red-200 text-red-800 cursor-not-allowed'
              }
            `}
          >
            <div className="text-2xl font-bold">#{id}</div>
            <div className="text-sm mt-1">{status}</div>
          </div>
        ))}
      </div>
      <button
        onClick={handleProceed}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Apartar Números Seleccionados
      </button>
    </div>
  );
}
