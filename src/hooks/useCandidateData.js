import { useState, useEffect } from 'react'
import { getCandidateByEmail, getJobList } from '../services/api'

const CANDIDATE_EMAIL = 'karabin.juan@gmail.com'

export function useCandidateData() {
  const [candidate, setCandidate] = useState(null)
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)
        const [candidateData, jobsData] = await Promise.all([
          getCandidateByEmail(CANDIDATE_EMAIL),
          getJobList(),
        ])
        setCandidate(candidateData)
        setJobs(jobsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { candidate, jobs, loading, error }
}
