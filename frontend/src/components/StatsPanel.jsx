export default function StatsPanel({ movies }) {
  const total = movies.length;
  const watched = movies.filter(m => m.status === 'watched').length;
  const watching = movies.filter(m => m.status === 'watching').length;
  const queued = movies.filter(m => m.status === 'want-to-watch').length;

  const avgRating = (() => {
    const rated = movies.filter(m => m.rating !== null);
    if (rated.length === 0) return '—';
    const sum = rated.reduce((acc, m) => acc + m.rating, 0);
    return (sum / rated.length).toFixed(1);
  })();

  const genres = [...new Set(movies.map(m => m.genre).filter(Boolean))];

  return (
    <aside className="stats-panel">
      <h2 className="stats-heading">Your List</h2>

      <div className="stat-row">
        <div className="stat-block">
          <span className="stat-number">{total}</span>
          <span className="stat-name">Total</span>
        </div>
        <div className="stat-block">
          <span className="stat-number accent-green">{watched}</span>
          <span className="stat-name">Watched</span>
        </div>
        <div className="stat-block">
          <span className="stat-number accent-amber">{watching}</span>
          <span className="stat-name">Watching</span>
        </div>
        <div className="stat-block">
          <span className="stat-number accent-muted">{queued}</span>
          <span className="stat-name">Queued</span>
        </div>
      </div>

      <div className="stat-divider" />

      <div className="stat-avg">
        <span className="avg-label">Avg. Rating</span>
        <span className="avg-value">{avgRating}</span>
      </div>

      <div className="stat-divider" />

      <div className="genres-section">
        <span className="genres-label">Genres</span>
        <div className="genre-tags">
          {genres.map((g) => {
            const count = movies.filter(m => m.genre === g).length;
            <span key={g} className="genre-tag">
              {g} <em>{count}</em>
            </span>
          })}
        </div>
      </div>
    </aside>
  );
}
