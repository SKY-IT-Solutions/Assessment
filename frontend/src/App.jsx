import { useState } from 'react';
import { useMovies } from './hooks/useMovies';
import MovieGrid from './components/MovieGrid';
import StatsPanel from './components/StatsPanel';
import AddMovieForm from './components/AddMovieForm';

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const { movies, loading, error, addMovie, markWatched, updateNotes, removeMovie } = useMovies();

  return (
    <div className="app">
      <header className="site-header">
        <div className="header-brand">
          <span className="brand-mark">◈</span>
          <span className="brand-name">CineLog</span>
        </div>
        <p className="header-tagline">Your personal film diary</p>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Add Film
        </button>
      </header>

      {showForm && (
        <AddMovieForm
          onAdd={addMovie}
          onClose={() => setShowForm(false)}
        />
      )}

      <div className="app-body">
        {error && (
          <div className="error-notice">
            Could not connect to API — {error}
          </div>
        )}

        {loading ? (
          <div className="loading-screen">
            <span className="loading-mark">◈</span>
            <span>Loading your list…</span>
          </div>
        ) : (
          <>
            <StatsPanel movies={movies} />
            <MovieGrid
              movies={movies}
              onMarkWatched={markWatched}
              onDelete={removeMovie}
              onUpdateNotes={updateNotes}
            />
          </>
        )}
      </div>

      <footer className="site-footer">
        <span>CineLog — Film Tracker</span>
      </footer>
    </div>
  );
}
