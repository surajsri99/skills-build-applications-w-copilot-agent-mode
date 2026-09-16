import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

type UserReference = { displayName?: string; username?: string }
type Entry = { _id: string; user: string | UserReference; points: number; period: string }

function Leaderboard() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection<Entry>('leaderboard').then(setEntries).catch((reason: Error) => setError(reason.message))
  }, [])

  const getDisplayName = (user: Entry['user']) => {
    if (typeof user === 'string') {
      return user
    }

    return user?.displayName || user?.username || 'Unknown athlete'
  }

  return <section className="resource-page"><div className="page-heading"><div><p className="eyebrow">Competition</p><h1>Leaderboard</h1></div><span className="count-badge">{entries.length} athletes</span></div><p className="page-intro">Points earned across the current challenge period.</p>{error ? <p className="error-message">{error}</p> : <div className="leaderboard-list">{entries.sort((first, second) => second.points - first.points).map((entry, index) => {
    const displayName = getDisplayName(entry.user)
    return <div className="leaderboard-row" key={entry._id}><strong className="rank">{String(index + 1).padStart(2, '0')}</strong><span className="avatar">{displayName.slice(-2).toUpperCase()}</span><span className="leaderboard-user">{displayName}<small>{entry.period}</small></span><strong>{entry.points} pts</strong></div>
  })}{entries.length === 0 && <p className="empty-state">No leaderboard entries found.</p>}</div>}</section>
}

export default Leaderboard