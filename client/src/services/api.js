const BASE_URL = "/api"; // ya con proxy no necesitas dominio completo

export const fetchNumbers = async () => {
  const res = await fetch(`${BASE_URL}/numeros`);
  if (!res.ok) throw new Error("Error fetching numbers");
  return await res.json();
};

export const postReservation = async (reservationData) => {
  const res = await fetch(`${BASE_URL}/reservas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reservationData),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error posting reservation");
  }
  return await res.json();
};
