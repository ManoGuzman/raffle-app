const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function loginAdmin({ username, password }) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error("Credenciales inválidas");

    const data = await res.json();
    return { success: true, token: data.token };
  } catch (err) {
    return { success: false, message: err.message };
  }
}
