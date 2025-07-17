import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboardPage = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [reservedNumbers, setReservedNumbers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("number");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // Redirect if not authenticated
  useEffect(() => {
    if (!token) navigate("/admin/login");
  }, [token, navigate]);

  // Fetch reservations data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/reservations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReservedNumbers(response.data);
      } catch (error) {
        console.error("Error fetching reserved numbers", error);
      }
    };
    fetchData();
  }, [token]);

  // Filter numbers based on search term and status
  const filteredNumbers = reservedNumbers.filter((item) => {
    const matchesSearch =
      item.number.toString().includes(searchTerm) ||
      (item.reservedBy?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (item.phone?.includes(searchTerm) ?? false);
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort filtered numbers
  const sortedNumbers = [...filteredNumbers].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedNumbers.length / itemsPerPage);
  const paginatedNumbers = sortedNumbers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  // Mark number as sold
  const handleMarkAsSold = async (numberId) => {
    try {
      await axios.patch(
        `/api/reservations/${numberId}/mark-as-sold`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReservedNumbers((prev) =>
        prev.map((item) =>
          item.id === numberId ? { ...item, status: "sold" } : item
        )
      );
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-4 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by number, name or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded w-full max-w-sm"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="all">All</option>
          <option value="reserved">Reserved</option>
          <option value="sold">Sold</option>
        </select>
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="number">Number</option>
          <option value="reservedBy">Name</option>
          <option value="status">Status</option>
          <option value="phone">Phone</option>
        </select>
        <button
          onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          {sortOrder === "asc" ? "Ascending ↑" : "Descending ↓"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedNumbers.map((item) => (
          <div key={item.id} className="p-4 border rounded shadow flex flex-col gap-2">
            <p><strong>Number:</strong> {item.number}</p>
            <p><strong>Name:</strong> {item.reservedBy || "-"}</p>
            <p><strong>Phone:</strong> {item.phone || "-"}</p>
            <p><strong>Status:</strong> {item.status}</p>
            {item.status === "reserved" && (
              <button
                onClick={() => handleMarkAsSold(item.id)}
                className="px-2 py-1 bg-green-500 text-white rounded mt-2"
              >
                Mark as Sold
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Previous
        </button>
        <span className="px-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
