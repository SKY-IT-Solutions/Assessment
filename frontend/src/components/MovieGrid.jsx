import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'want-to-watch', label: 'Queued' },
  { key: 'watching', label: 'Watching' },
  { key: 'watched', label: 'Watched' },
];

export default function MovieGrid({ movies, onMarkWatched, onDelete, onUpdateNotes }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('addedAt');
  const [visibleCount, setVisibleCount] = useState(0);

  const filteredMovies = activeFilter === 'all'
    ? movies
    : movies.filter(m => m.status === activeFilter);

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'year') return (b.year ?? 0) - (a.year ?? 0);
    if (sortBy === 'rating') return (b.rating ?? 0) - (a.rating ?? 0);
    return new Date(b.addedAt) - new Date(a.addedAt);
  });

  useEffect(() => {
    setVisibleCount(filteredMovies.length);
  }, [activeFilter]);

  return (
    <section className="movie-grid-section">
      <div className="grid-controls">
        <div className="filter-group">
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`filter-btn ${activeFilter === f.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="sort-group">
          <label className="sort-label">Sort by</label>
          <select
            className="sort-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="addedAt">Date Added</option>
            <option value="title">Title</option>
            <option value="year">Year</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <span className="visible-count">{visibleCount} films</span>
      </div>

      {filterMovies.length === 0 ? (
        <div className="empty-list">
          <p className="empty-text">Nothing here yet.</p>
        </div>
      ) : (
        <div className="movie-list">
          {filterMovies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMarkWatched={onMarkWatched}
              onDelete={onDelete}
              onUpdateNotes={onUpdateNotes}
            />
          ))}
        </div>
      )}
    </section>
  );
}
