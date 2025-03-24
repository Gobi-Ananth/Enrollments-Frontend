import { useState, useEffect } from "react";
import "./Tab.css";

export default function PendingTab({
  interviews,
  onTakeInterview,
  hasMeetLink,
}) {
  const [glitchIndex, setGlitchIndex] = useState(null);

  useEffect(() => {
    // Random glitch effect on interview cards
    const glitchInterval = setInterval(() => {
      if (interviews.length > 0) {
        const randomIndex = Math.floor(Math.random() * interviews.length);
        setGlitchIndex(randomIndex);
        setTimeout(() => setGlitchIndex(null), 300);
      }
    }, Math.random() * 8000 + 5000);

    return () => clearInterval(glitchInterval);
  }, [interviews]);

  return (
    <div className="tabContent fade-in">
      <h1 className="title">Pending Interviews</h1>

      {!hasMeetLink && (
        <div className="warning">
          <p>You need to create a meet link before taking interviews.</p>
          <p>Go to the Create tab to set up your meet link.</p>
        </div>
      )}

      {interviews.length === 0 ? (
        <div className="emptyState">
          <p>No pending interviews available.</p>
        </div>
      ) : (
        <div className="interviewList">
          {interviews.map((interview, index) => (
            <div
              key={interview.id}
              className={`interviewCard ${
                glitchIndex === index ? "glitchCard" : ""
              }`}
            >
              <div className="interviewInfo">
                <h3>{interview.name}</h3>
                <p className="techStack">Tech Stack: {interview.techStack}</p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => onTakeInterview(interview.id)}
                disabled={!hasMeetLink}
              >
                Take Interview
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
