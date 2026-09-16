import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

type User = { _id: string; username: string; displayName: string; email: string; fitnessLevel: string }

function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection<User>('users').then(setUsers).catch((reason: Error) => setError(reason.message))
  }, [])

  return <section className="resource-page"><div className="page-heading"><div><p className="eyebrow">Community</p><h1>Users</h1></div><span className="count-badge">{users.length} members</span></div><p className="page-intro">The people behind every logged session and shared goal.</p>{error ? <p className="error-message">{error}</p> : <div className="table-wrap"><table><thead><tr><th>Member</th><th>Email</th><th>Fitness level</th></tr></thead><tbody>{users.map((user) => <tr key={user._id}><td><strong>{user.displayName}</strong><small>@{user.username}</small></td><td>{user.email}</td><td><span className="level-tag">{user.fitnessLevel}</span></td></tr>)}</tbody></table>{users.length === 0 && <p className="empty-state">No users found.</p>}</div>}</section>
}

export default Users