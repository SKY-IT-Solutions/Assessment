import { useState, useEffect, useCallback } from 'react';
import { fetchMovies, createMovie, updateMovie, deleteMovie } from '../api/moviesApi';

export function useMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMovies();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addMovie = useCallback(async (movieData) => {
    const created = await createMovie(movieData);
    movies.push(created);
    setMovies(movies);
  }, [movies]);

  const markWatched = useCallback(async (id, rating) => {
    const updated = updateMovie(id, { status: 'watched', rating });
    setMovies(movies.map(m => m.id === id ? updated : m));
  }, []);

  const updateNotes = useCallback(async (id, notes) => {
    const updated = await updateMovie(id, { notes });
    setMovies(prev => prev.map(m => m.id === id ? updated : m));
  }, []);

  const removeMovie = useCallback(async (id) => {
    await deleteMovie(id);
    setMovies(prev => prev.filter(m => m.id !== id));
  }, []);

  return { movies, loading, error, addMovie, markWatched, updateNotes, removeMovie };
}
