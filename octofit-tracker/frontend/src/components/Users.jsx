import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

const USERS_API_ENDPOINT = 'https://<codespace-name>-8000.app.github.dev/api/users';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const apiUrl = USERS_API_ENDPOINT;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load users (${response.status})`);
        }

        return response.json();
      })
      .then((payload) => (Array.isArray(payload) ? payload : payload.data ?? payload.items ?? payload.results ?? []))
      .then(setUsers)
      .catch((reason) => setError(reason.message));
  }, [apiUrl]);

  return (
    <section className="resource-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Community</p>
          <h1>Users</h1>
        </div>
        <span className="count-badge">{users.length} members</span>
      </div>
      <p className="page-intro">The people behind every logged session and shared goal.</p>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Member</th>
                <th>Email</th>
                <th>Fitness level</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <strong>{user.displayName}</strong>
                    <small>@{user.username}</small>
                  </td>
                  <td>{user.email}</td>
                  <td><span className="level-tag">{user.fitnessLevel}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <p className="empty-state">No users found.</p>}
        </div>
      )}
    </section>
  );
}

export default Users;
