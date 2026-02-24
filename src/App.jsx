import { useCandidateData } from './hooks/useCandidateData'
import CandidateCard from './components/CandidateCard'
import JobList from './components/JobList'
import logo from './assets/logo.png'

function App() {
  const { candidate, jobs, loading, error } = useCandidateData()

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <img src={logo} alt="Nimble Gravity" className="header-logo-img" />
          <div className="header-divider" />
          <span className="header-subtitle">Posiciones abiertas</span>
        </div>
      </header>

      <main className="app-main">
        {loading && (
          <div className="loading-state">
            <div className="loader" />
            <p>Cargando datos...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>⚠ {error}</p>
          </div>
        )}

        {!loading && !error && candidate && (
          <>
            <CandidateCard candidate={candidate} />
            <section className="jobs-section">
              <h2>Posiciones disponibles</h2>
              <JobList jobs={jobs} candidate={candidate} />
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default App
