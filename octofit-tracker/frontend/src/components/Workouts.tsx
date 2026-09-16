import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

type Workout = { _id: string; title: string; description: string; activityType: string; difficulty: string; durationMinutes: number }

function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection<Workout>('workouts').then(setWorkouts).catch((reason: Error) => setError(reason.message))
  }, [])

  return <section className="resource-page"><div className="page-heading"><div><p className="eyebrow">Training library</p><h1>Workouts</h1></div><span className="count-badge">{workouts.length} plans</span></div><p className="page-intro">Choose a focused session that meets you where you are.</p>{error ? <p className="error-message">{error}</p> : <div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id}><div className="workout-card-top"><span className="level-tag">{workout.difficulty}</span><span className="muted-label">{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><span className="workout-type">{workout.activityType}</span></article>)}{workouts.length === 0 && <p className="empty-state">No workouts found.</p>}</div>}</section>
}

export default Workouts