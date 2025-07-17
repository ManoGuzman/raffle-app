const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchReservations(token) {
  try {
    const res = await fetch(`${API_URL}/admin/reservations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch reservations');
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
