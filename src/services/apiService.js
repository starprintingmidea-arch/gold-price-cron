import fetch from 'node-fetch';

export async function fetchGoldPrice(apiUrl) {
  const res = await fetch(apiUrl);
  const data = await res.json();

  if (!data.price) {
    throw new Error('Invalid API response');
  }

  return parseFloat(data.price);
}