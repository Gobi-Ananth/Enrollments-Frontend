import { useState } from "react";
import Sidebar from "./Sidebar";
import PendingTab from "./PendingTab";
import CreateTab from "./CreateTab";
import OngoingTab from "./OngoingTab";
import ReviewTab from "./ReviewTab";
import "./InterviewAdmin.css";

export default function InterviewAdmin() {
  const [activeTab, setActiveTab] = useState("pending");
  const [meetLink, setMeetLink] = useState("");
  const [adminName, setAdminName] = useState("Admin");
  const [interviews, setInterviews] = useState([
    {
      id: 1,
      name: "John Doe",
      techStack: "React, Node.js",
      status: "pending",
      admins: [],
    },
    {
      id: 2,
      name: "Jane Smith",
      techStack: "Angular, Python",
      status: "pending",
      admins: [],
    },
    {
      id: 3,
      name: "Alex Johnson",
      techStack: "Vue, PHP",
      status: "pending",
      admins: [],
    },
  ]);
  const [currentReview, setCurrentReview] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCreateMeet = (link) => {
    setMeetLink(link);
  };

  const handleTakeInterview = (id) => {
    if (!meetLink) return;

    const updatedInterviews = interviews.map((interview) => {
      if (interview.id === id) {
        return { ...interview, status: "ongoing", admins: [adminName] };
      }
      return interview;
    });

    setInterviews(updatedInterviews);
    setActiveTab("ongoing");
    setCurrentReview(id);
  };

  const handleJoinMeet = (id) => {
    const updatedInterviews = interviews.map((interview) => {
      if (interview.id === id && !interview.admins.includes(adminName)) {
        return { ...interview, admins: [...interview.admins, adminName] };
      }
      return interview;
    });

    setInterviews(updatedInterviews);
  };

  const handleSubmitReview = (id, reviewData) => {
    const updatedInterviews = interviews.map((interview) => {
      if (interview.id === id) {
        return { ...interview, status: "reviewed", review: reviewData };
      }
      return interview;
    });

    setInterviews(updatedInterviews);
    setCurrentReview(null);
    setActiveTab("pending");
  };

  return (
    <div className="admin_container">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="admin_content_area">
        {activeTab === "pending" && (
          <PendingTab
            interviews={interviews.filter((i) => i.status === "pending")}
            onTakeInterview={handleTakeInterview}
            hasMeetLink={!!meetLink}
          />
        )}
        {activeTab === "create" && (
          <CreateTab onCreateMeet={handleCreateMeet} />
        )}
        {activeTab === "ongoing" && (
          <OngoingTab
            interviews={interviews.filter((i) => i.status === "ongoing")}
            onJoinMeet={handleJoinMeet}
            meetLink={meetLink}
          />
        )}
        {activeTab === "review" && (
          <ReviewTab
            interviews={interviews.filter((i) => i.status === "ongoing")}
            currentReview={currentReview}
            onSubmitReview={handleSubmitReview}
            adminName={adminName}
          />
        )}
      </main>
    </div>
  );
}
