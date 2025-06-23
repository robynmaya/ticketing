export async function createOrder(payload) {
  const res = await fetch('https://api.example.com/orders/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Order submission failed: ${res.status}`);
  }
  return res.json();
}
