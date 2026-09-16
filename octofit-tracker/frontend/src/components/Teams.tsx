import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

type Team = { _id: string; name: string; description?: string; members?: string[] }

function Teams() {
  const [teams, setTeams] = useState<Team[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection<Team>('teams').then(setTeams).catch((reason: Error) => setError(reason.message))
  }, [])

  return <section className="resource-page"><div className="page-heading"><div><p className="eyebrow">Squads</p><h1>Teams</h1></div><span className="count-badge">{teams.length} teams</span></div><p className="page-intro">Find your people and keep the group moving together.</p>{error ? <p className="error-message">{error}</p> : <div className="team-grid">{teams.map((team) => <article className="team-card" key={team._id}><span className="team-symbol">{team.name.slice(0, 1).toUpperCase()}</span><h2>{team.name}</h2><p>{team.description || 'Ready for a new challenge.'}</p><span className="muted-label">{team.members?.length ?? 0} members</span></article>)}{teams.length === 0 && <p className="empty-state">No teams found.</p>}</div>}</section>
}

export default Teams