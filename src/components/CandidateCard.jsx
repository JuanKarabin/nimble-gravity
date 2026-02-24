import profilePhoto from '../assets/profile.png'

function CandidateCard({ candidate }) {
  return (
    <div className="candidate-card">
      <div className="candidate-avatar">
        <img
          src={profilePhoto}
          alt={`${candidate.firstName} ${candidate.lastName}`}
          className="candidate-avatar-img"
        />
      </div>
      <div className="candidate-info">
        <h2>{candidate.firstName} {candidate.lastName}</h2>
        <p>{candidate.email}</p>
      </div>
    </div>
  )
}

export default CandidateCard
