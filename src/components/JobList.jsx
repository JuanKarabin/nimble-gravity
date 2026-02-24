import { useState, useMemo } from 'react'
import JobItem from './JobItem'

const PAGE_SIZE = 5

function JobList({ jobs, candidate }) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return q ? jobs.filter((j) => j.title.toLowerCase().includes(q)) : jobs
  }, [jobs, search])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleSearch(e) {
    setSearch(e.target.value)
    setPage(1)
  }

  return (
    <div className="job-list-container">
      <div className="search-wrapper">
        <span className="search-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por título..."
          value={search}
          onChange={handleSearch}
        />
        {search && (
          <button className="search-clear" onClick={() => { setSearch(''); setPage(1) }} aria-label="Limpiar búsqueda">✕</button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">No se encontraron posiciones para "{search}".</p>
      ) : (
        <>
          <p className="results-count">
            {filtered.length} posición{filtered.length !== 1 ? 'es' : ''} encontrada{filtered.length !== 1 ? 's' : ''}
          </p>

          <ul className="job-list">
            {paginated.map((job) => (
              <li key={job.id}>
                <JobItem job={job} candidate={candidate} />
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
              >
                ← Anterior
              </button>

              <div className="page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    className={`page-num ${p === page ? 'active' : ''}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button
                className="page-btn"
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
              >
                Siguiente →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default JobList
