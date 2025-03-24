import { useState } from "react";
import "./Tab.css";

export default function ReviewTab({
  interviews,
  currentReview,
  onSubmitReview,
  adminName,
}) {
  const [reviewData, setReviewData] = useState({
    technicalSkills: "",
    communicationSkills: "",
    problemSolving: "",
    codeQuality: "",
    overallRating: "3",
    feedback: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e, id) => {
    // e.preventDefault();
    // setIsSubmitting(true);
    // // Simulate API call
    // setTimeout(() => {
    //   onSubmitReview(id, reviewData);
    //   setIsSubmitting(false);
    //   // Reset form
    //   setReviewData({
    //     technicalSkills: "",
    //     communicationSkills: "",
    //     problemSolving: "",
    //     codeQuality: "",
    //     overallRating: "3",
    //     feedback: "",
    //   });
    // }, 2000);
  };

  const currentInterview = interviews.find(
    (interview) => interview.id === currentReview
  );
  const canReview =
    currentInterview && currentInterview.admins[0] === adminName;

  return (
    <div className="tabContent fade-in">
      <h1 className="title">Review Candidates</h1>

      {!currentReview ? (
        <div className="emptyState">
          <p>You haven't taken any interviews yet.</p>
          <p>Go to the Pending tab to take an interview.</p>
        </div>
      ) : !canReview ? (
        <div className="warning">
          <p>Only the admin who initiated the interview can submit a review.</p>
          <p>You can join the interview from the Ongoing tab.</p>
        </div>
      ) : (
        <div className="reviewForm">
          <h2>Reviewing: {currentInterview?.name}</h2>
          <p className="techStack">Tech Stack: {currentInterview?.techStack}</p>

          <form onSubmit={(e) => handleSubmit(e, currentReview)}>
            <div className="formGroup">
              <label htmlFor="technicalSkills">Technical Skills</label>
              <input
                type="text"
                id="technicalSkills"
                name="technicalSkills"
                value={reviewData.technicalSkills}
                onChange={handleChange}
                placeholder="Evaluate technical skills"
                required
                className="input"
              />
            </div>

            <div className="formGroup">
              <label htmlFor="communicationSkills">Communication Skills</label>
              <input
                type="text"
                id="communicationSkills"
                name="communicationSkills"
                value={reviewData.communicationSkills}
                onChange={handleChange}
                placeholder="Evaluate communication skills"
                required
                className="input"
              />
            </div>

            <div className="formGroup">
              <label htmlFor="problemSolving">Problem Solving</label>
              <input
                type="text"
                id="problemSolving"
                name="problemSolving"
                value={reviewData.problemSolving}
                onChange={handleChange}
                placeholder="Evaluate problem solving abilities"
                required
                className="input"
              />
            </div>

            <div className="formGroup">
              <label htmlFor="codeQuality">Code Quality</label>
              <input
                type="text"
                id="codeQuality"
                name="codeQuality"
                value={reviewData.codeQuality}
                onChange={handleChange}
                placeholder="Evaluate code quality"
                required
                className="input"
              />
            </div>

            <div className="formGroup">
              <label htmlFor="overallRating">Overall Rating (1-5)</label>
              <select
                id="overallRating"
                name="overallRating"
                value={reviewData.overallRating}
                onChange={handleChange}
                className="select"
                required
              >
                <option value="1">1 - Poor</option>
                <option value="2">2 - Below Average</option>
                <option value="3">3 - Average</option>
                <option value="4">4 - Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>

            <div className="formGroup">
              <label htmlFor="feedback">Additional Feedback</label>
              <textarea
                id="feedback"
                name="feedback"
                value={reviewData.feedback}
                onChange={handleChange}
                placeholder="Provide additional feedback"
                rows={4}
                className="textarea"
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primary submitButton ${
                isSubmitting ? "loading" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
