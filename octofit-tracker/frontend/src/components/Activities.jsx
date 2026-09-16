import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

const ACTIVITY_API_ENDPOINT = 'https://<codespace-name>-8000.app.github.dev/api/activities';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  const apiUrl = ACTIVITY_API_ENDPOINT;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load activities (${response.status})`);
        }

        return response.json();
      })
      .then((payload) => (Array.isArray(payload) ? payload : payload.data ?? payload.items ?? payload.results ?? []))
      .then(setActivities)
      .catch((reason) => setError(reason.message));
  }, [apiUrl]);

  return (
    <section className="resource-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Movement log</p>
          <h1>Activities</h1>
        </div>
        <span className="count-badge">{activities.length} logged</span>
      </div>
      <p className="page-intro">A live view of the team’s training momentum.</p>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Duration</th>
                <th>Distance</th>
                <th>Points</th>
                <th>Logged</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td><span className="status-dot" />{activity.type}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.distanceKm ? `${activity.distanceKm} km` : '—'}</td>
                  <td className="numeric">{activity.points}</td>
                  <td>{new Date(activity.loggedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {activities.length === 0 && <p className="empty-state">No activities found.</p>}
        </div>
      )}
    </section>
  );
}

export default Activities;
