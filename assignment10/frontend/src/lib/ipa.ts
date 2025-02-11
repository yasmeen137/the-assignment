
export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
  const url = `${baseURL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}