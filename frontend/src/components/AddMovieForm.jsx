import { useState } from 'react';

const GENRES = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Documentary', 'Animation', 'Historical', 'Unknown'];

export default function AddMovieForm({ onAdd, onClose }) {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('Drama');
  const [year, setYear] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('A title is required.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await onAdd({ title: title.trim(), director: director.trim(), genre, year: year || null, notes: notes.trim() });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add to List</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="add-form">
          {error && <p className="form-error">{error}</p>}

          <div className="field">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Film title"
              autoFocus
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="director">Director</label>
              <input
                id="director"
                value={director}
                onChange={e => setDirector(e.target.value)}
                placeholder="e.g. Wim Wenders"
              />
            </div>
            <div className="field field-sm">
              <label htmlFor="year">Year</label>
              <input
                id="year"
                type="number"
                value={year}
                onChange={e => setYear(e.target.value)}
                placeholder="2024"
                min="1888"
                max="2030"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="genre">Genre</label>
            <select id="genre" value={genre} onChange={e => setGenre(e.target.value)}>
              {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div className="field">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Why you want to watch it…"
              rows={2}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Adding…' : '+ Add Film'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
