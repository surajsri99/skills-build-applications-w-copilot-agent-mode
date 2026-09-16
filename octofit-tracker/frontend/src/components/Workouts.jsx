import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

const WORKOUTS_API_ENDPOINT = 'https://<codespace-name>-8000.app.github.dev/api/workouts';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  const apiUrl = WORKOUTS_API_ENDPOINT;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load workouts (${response.status})`);
        }

        return response.json();
      })
      .then((payload) => (Array.isArray(payload) ? payload : payload.data ?? payload.items ?? payload.results ?? []))
      .then(setWorkouts)
      .catch((reason) => setError(reason.message));
  }, [apiUrl]);

  return (
    <section className="resource-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Training library</p>
          <h1>Workouts</h1>
        </div>
        <span className="count-badge">{workouts.length} plans</span>
      </div>
      <p className="page-intro">Choose a focused session that meets you where you are.</p>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="workout-grid">
          {workouts.map((workout) => (
            <article className="workout-card" key={workout._id}>
              <div className="workout-card-top">
                <span className="level-tag">{workout.difficulty}</span>
                <span className="muted-label">{workout.durationMinutes} min</span>
              </div>
              <h2>{workout.title}</h2>
              <p>{workout.description}</p>
              <span className="workout-type">{workout.activityType}</span>
            </article>
          ))}
          {workouts.length === 0 && <p className="empty-state">No workouts found.</p>}
        </div>
      )}
    </section>
  );
}

export default Workouts;
