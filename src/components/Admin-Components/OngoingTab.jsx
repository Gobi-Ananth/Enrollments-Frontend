import { useState } from "react";
import { ExternalLink } from "lucide-react";
import "./Tab.css";

export default function OngoingTab({ interviews, onJoinMeet, meetLink }) {
  const [joining, setJoining] = useState(null);

  const handleJoinMeet = (id) => {
    setJoining(id);

    // Gobi this is Simulating joining
    setTimeout(() => {
      onJoinMeet(id);
      setJoining(null);

      if (meetLink) {
        window.open(meetLink, "_blank");
      }
    }, 1000);
  };

  return (
    <div className="admin_tabContent fade-in">
      <h1 className="admin_title">Ongoing Interviews</h1>

      {interviews.length === 0 ? (
        <div className="admin_emptyState">
          <p>No ongoing interviews at the moment.</p>
        </div>
      ) : (
        <div className="admin_interviewList">
          {interviews.map((interview) => (
            <div key={interview.id} className="admin_interviewCard">
              <div className="admin_interviewInfo">
                <h3>{interview.name}</h3>
                <p className="admin_techStack">
                  Tech Stack: {interview.techStack}
                </p>

                <div className="admin_adminList">
                  <h4>Current Admins:</h4>
                  {interview.admins.length > 0 ? (
                    <ul>
                      {interview.admins.map((admin, index) => (
                        <li key={index} className="admin_adminItem">
                          {admin}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No admins have joined yet</p>
                  )}
                </div>
              </div>

              <button
                className={`admin_btn admin_joinButton ${
                  joining === interview.id ? "admin_loading" : ""
                }`}
                onClick={() => handleJoinMeet(interview.id)}
                disabled={joining !== null}
              >
                <ExternalLink className="admin_buttonIcon" />
                {joining === interview.id ? "Joining..." : "Join Meet"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
