import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchReservations } from "../services/admin";

const AdminPage = () => {
  const { token, logout } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadReservations() {
      const result = await fetchReservations(token);
      if (result.success) {
        setReservations(result.data);
      } else {
        setError(result.message);
      }
      setLoading(false);
    }
    loadReservations();
  }, [token]);

  const handleLogout = () => {
    logout();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Reservations</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Number</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Reserved By</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">Reserved At</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.id}>
              <td className="border border-gray-300 p-2">{r.number}</td>
              <td className="border border-gray-300 p-2">{r.status}</td>
              <td className="border border-gray-300 p-2">{r.reservedBy || "-"}</td>
              <td className="border border-gray-300 p-2">{r.email || "-"}</td>
              <td className="border border-gray-300 p-2">{r.phone || "-"}</td>
              <td className="border border-gray-300 p-2">
                {r.reservedAt ? new Date(r.reservedAt).toLocaleString() : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
