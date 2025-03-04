import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import "./SlotWindow.css";

export default function SlotWindow() {
  const [slot] = useState({
    date: "8 March 2025",
    time: "21:45",
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState("waiting");
  const [meetingLink, setMeetingLink] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const formattedTime = currentTime.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (formattedTime === slot.time) {
      setStatus("ready");
    }
  }, [currentTime, slot.time]);

  const handleReadyClick = async () => {
    console.log("Candidate is ready!");
  };

  return (
    <div className="slot-window-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="window waiting-window"
      >
        WAITING...
        <div className="loading-spinner"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100, y: -50, rotate: -5 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="window slot-window"
      >
        YOUR SLOT
        <div className="slot-info">
          <div className="slot-item date">
            <Calendar className="icon" /> {slot.date}
          </div>
          <div className="slot-item time">
            <Clock className="icon" /> {slot.time}
          </div>
        </div>
        {status === "ready" && (
          <button className="ready-btn" onClick={handleReadyClick}>
            I'M READY!
          </button>
        )}
        {status === "confirmed" && (
          <a
            href={meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="join-btn"
          >
            JOIN MEETING
          </a>
        )}
      </motion.div>
    </div>
  );
}
