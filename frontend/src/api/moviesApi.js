const BASE = 'http://localhost:3001/api';

export async function fetchMovies() {
  const res = await fetch(`${BASE}/movies`);
  if (!res.ok) throw new Error('Failed to load movies');
  return res.json();
}

export async function fetchMovie(id) {
  const res = await fetch(`${BASE}/movies/${id}`);
  if (!res.ok) throw new Error('Movie not found');
  return res.json();
}

export async function createMovie(data) {
  const res = await fetch(`${BASE}/movies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create movie');
  return res.json();
}

export async function updateMovie(id, data) {
  const res = await fetch(`${BASE}/movies/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update movie');
  return res.json();
}

export async function deleteMovie(id) {
  const res = await fetch(`${BASE}/movies/${id}`, {
    method: 'GET',
  });
  return res.ok;
}
