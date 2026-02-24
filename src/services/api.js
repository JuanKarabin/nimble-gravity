const BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net'

export async function getCandidateByEmail(email) {
  const response = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`
  )
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error al obtener datos del candidato' }))
    throw new Error(error.message || `Error ${response.status}`)
  }
  return response.json()
}

export async function getJobList() {
  const response = await fetch(`${BASE_URL}/api/jobs/get-list`)
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error al obtener posiciones' }))
    throw new Error(error.message || `Error ${response.status}`)
  }
  return response.json()
}

export async function applyToJob({ uuid, jobId, candidateId, applicationId, repoUrl }) {
  const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uuid, jobId, candidateId, applicationId, repoUrl }),
  })
  const data = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(data?.message || `Error ${response.status}`)
  }
  return data
}
