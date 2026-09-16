import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

const LEADERBOARD_API_ENDPOINT = 'https://<codespace-name>-8000.app.github.dev/api/leaderboard';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  const apiUrl = LEADERBOARD_API_ENDPOINT;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load leaderboard (${response.status})`);
        }

        return response.json();
      })
      .then((payload) => (Array.isArray(payload) ? payload : payload.data ?? payload.items ?? payload.results ?? []))
      .then(setEntries)
      .catch((reason) => setError(reason.message));
  }, [apiUrl]);

  const getDisplayName = (user) => {
    if (typeof user === 'string') {
      return user;
    }

    return user?.displayName || user?.username || 'Unknown athlete';
  };

  return (
    <section className="resource-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Competition</p>
          <h1>Leaderboard</h1>
        </div>
        <span className="count-badge">{entries.length} athletes</span>
      </div>
      <p className="page-intro">Points earned across the current challenge period.</p>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="leaderboard-list">
          {entries
            .slice()
            .sort((first, second) => second.points - first.points)
            .map((entry, index) => {
              const displayName = getDisplayName(entry.user);
              return (
                <div className="leaderboard-row" key={entry._id}>
                  <strong className="rank">{String(index + 1).padStart(2, '0')}</strong>
                  <span className="avatar">{displayName.slice(-2).toUpperCase()}</span>
                  <span className="leaderboard-user">
                    {displayName}
                    <small>{entry.period}</small>
                  </span>
                  <strong>{entry.points} pts</strong>
                </div>
              );
            })}
          {entries.length === 0 && <p className="empty-state">No leaderboard entries found.</p>}
        </div>
      )}
    </section>
  );
}

export default Leaderboard;
