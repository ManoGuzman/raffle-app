import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminNavbar() {
  const { logout, isAuthenticated, username } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold">Panel de Administración</h1>
        {username && <p className="text-sm">Bienvenido, {username}</p>}
      </div>

      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
        >
          Cerrar sesión
        </button>
      )}
    </nav>
  );
}
