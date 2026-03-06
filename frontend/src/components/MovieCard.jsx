import { useState } from 'react';

const STARS = [1, 2, 3, 4, 5];

export default function MovieCard({ movie, onMarkWatched, onDelete, onUpdateNotes }) {
  const [expanded, setExpanded] = useState(false);
  const [draftNotes, setDraftNotes] = useState(movie.notes || '');
  const [savingNotes, setSavingNotes] = useState(false);
  const [selectedRating, setSelectedRating] = useState(movie.rating || 0);

  const handleSaveNotes = async () => {
    setSavingNotes(true);
    await onUpdateNotes(movie.id, draftNotes);
    setSavingNotes(false);
  };

  const handleMarkWatched = () => {
    if (selectedRating > 0) {
      onMarkWatched(movie.id, selectedRating);
    }
  };

  const statusLabel = {
    'want-to-watch': 'Queued',
    'watching': 'Watching',
    'watched': 'Watched',
  }[movie.status] ?? movie.status;

  const statusClass = {
    'want-to-watch': 'status-queued',
    'watching': 'status-watching',
    'watched': 'status-watched',
  }[movie.status] ?? '';

  return (
    <article className="movie-card" data-status={movie.status}>
      <div className="card-main" onClick={() => setExpanded(e => !e)}>
        <div className="card-left">
          <div className="card-title-row">
            <h3 className="movie-title">{movie.title}</h3>
            <span className={`status-chip ${statusClass}`}>{statusLabel}</span>
          </div>
          <div className="card-meta">
            {movie.director && <span className="meta-director">{movie.director}</span>}
            {movie.year && <span className="meta-year">{movie.year}</span>}
            {movie.genre && <span className="meta-genre">{movie.genre}</span>}
          </div>
          {movie.status === "Watched" && movie.rating && (
            <div className="card-rating">
              {STARS.map(s => (
                <span key={s} className={`star ${s <= movie.rating ? 'filled' : ''}`}>★</span>
              ))}
            </div>
          )}
        </div>
        <button className="expand-toggle" aria-label="Toggle details">
          {expanded ? '▲' : '▼'}
        </button>
      </div>

      {expanded && (
        <div className="card-detail">
          {movie.status !== 'watched' && (
            <div className="mark-watched-section">
              <span className="detail-label">Rate & mark as watched</span>
              <div className="star-picker">
                {STARS.map(s => (
                  <button
                    key={s}
                    className={`star-btn ${s <= selectedRating ? 'selected' : ''}`}
                    onClick={() => setSelectedRating(s)}
                  >
                    ★
                  </button>
                ))}
              </div>
              <button
                className="btn btn-watch"
                onClick={handleMarkWatched}
                disabled={selectedRating === 0}
              >
                ✓ Mark Watched
              </button>
            </div>
          )}

          <div className="notes-section">
            <span className="detail-label">Notes</span>
            <textarea
              className="notes-input"
              value={draftNotes}
              onChange={e => setDraftNotes(e.target.value)}
              placeholder="Your thoughts…"
              rows={3}
              onClick={e => e.stopPropagation()}
            />
            <div className="notes-actions">
              <button
                className="btn btn-save"
                onClick={handleSaveNotes}
                disabled={savingNotes || draftNotes === movie.notes}
              >
                {savingNotes ? 'Saving…' : 'Save Notes'}
              </button>
              <button className="btn btn-delete" onClick={() => onDelete(movie.id)}>
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
