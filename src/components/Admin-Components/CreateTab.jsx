import { useState } from "react";
import "./Tab.css";

export default function CreateTab({ onCreateMeet }) {
  const [meetLink, setMeetLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!meetLink) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onCreateMeet(meetLink);
      setIsSubmitting(false);
      setSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="tabContent fade-in">
      <h1 className="title">Create Meeting</h1>

      <div className="createForm">
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="meetLink">Meeting Link</label>
            <input
              type="url"
              id="meetLink"
              value={meetLink}
              onChange={(e) => setMeetLink(e.target.value)}
              placeholder="Enter your meeting URL"
              required
              className="input"
            />
            <p className="hint">
              Enter a valid meeting URL (Google Meet, Zoom, etc.)
            </p>
          </div>

          <button
            type="submit"
            className={`btn btn-primary createButton ${
              isSubmitting ? "loading" : ""
            }`}
            disabled={isSubmitting || !meetLink}
          >
            {isSubmitting ? "Creating..." : "Create Meet"}
          </button>

          {success && (
            <div className="successMessage">
              <p>Meeting link created successfully!</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
