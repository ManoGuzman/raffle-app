const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function getAvailableNumbers() {
  const res = await fetch(`${API_BASE}/numbers`);
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
}

export async function reserveNumbers(data) {
  const res = await fetch(`${API_BASE}/numbers/reserve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
}

export async function confirmPurchase(data) {
  const res = await fetch(`${API_BASE}/numbers/confirm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
}
