import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/">
          <span className="brand-mark">O</span>
          <span>OctoFit</span>
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/users">Users</NavLink>
        </nav>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
