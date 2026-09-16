import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

type Activity = {
  _id: string
  type: string
  durationMinutes: number
  distanceKm?: number
  points: number
  loggedAt: string
}

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection<Activity>('activities').then(setActivities).catch((reason: Error) => setError(reason.message))
  }, [])

  return (
    <section className="resource-page">
      <div className="page-heading"><div><p className="eyebrow">Movement log</p><h1>Activities</h1></div><span className="count-badge">{activities.length} logged</span></div>
      <p className="page-intro">A live view of the team’s training momentum.</p>
      {error ? <p className="error-message">{error}</p> : <div className="table-wrap"><table><thead><tr><th>Type</th><th>Duration</th><th>Distance</th><th>Points</th><th>Logged</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id}><td><span className="status-dot" />{activity.type}</td><td>{activity.durationMinutes} min</td><td>{activity.distanceKm ? `${activity.distanceKm} km` : '—'}</td><td className="numeric">{activity.points}</td><td>{new Date(activity.loggedAt).toLocaleDateString()}</td></tr>)}</tbody></table>{activities.length === 0 && <p className="empty-state">No activities found.</p>}</div>}
    </section>
  )
}

export default Activities