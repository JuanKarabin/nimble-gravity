import { useState } from 'react'
import { applyToJob } from '../services/api'

const GITHUB_REPO_URL = 'https://github.com/JuanKarabin/nimble-gravity'

function JobItem({ job, candidate }) {
  const [repoUrl, setRepoUrl] = useState(GITHUB_REPO_URL)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!repoUrl.trim()) {
      setErrorMessage('Por favor ingresá la URL de tu repositorio.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      await applyToJob({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        repoUrl: repoUrl.trim(),
      })
      setStatus('success')
    } catch (err) {
      setErrorMessage(err.message)
      setStatus('error')
    }
  }

  return (
    <article className="job-item">
      <h3 className="job-title">{job.title}</h3>
      <span className="job-id">ID: {job.id}</span>

      <form onSubmit={handleSubmit} className="job-form">
        <div className="input-group">
          <label htmlFor={`repo-${job.id}`}>GitHub Repository URL</label>
          <input
            id={`repo-${job.id}`}
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/tu-usuario/tu-repo"
            disabled={status === 'loading' || status === 'success'}
            required
          />
        </div>

        <button
          type="submit"
          className={`submit-btn ${status}`}
          disabled={status === 'loading' || status === 'success'}
        >
          {status === 'loading' && <span className="spinner" />}
          {status === 'loading' ? 'Enviando...' : status === 'success' ? '✓ Enviado' : 'Submit'}
        </button>
      </form>

      {status === 'success' && (
        <p className="feedback success">¡Postulación enviada exitosamente!</p>
      )}
      {status === 'error' && (
        <p className="feedback error">{errorMessage}</p>
      )}
    </article>
  )
}

export default JobItem
