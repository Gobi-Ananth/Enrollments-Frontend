import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import "./Interview.css";

export default function Interview() {
  const [availableDates, setAvailableDates] = useState([]);
  const [date, setDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAvailableDates();
  }, []);

  const fetchAvailableDates = async () => {
    try {
      const response = await axios.get("/api/slots/available", {
        withCredentials: true,
      });
      const slotData = response.data.data;

      const availableDatesList = slotData.map(
        (slot) => new Date(slot.time).toISOString().split("T")[0]
      );
      setAvailableDates(availableDatesList);
    } catch (error) {
      console.error("Error fetching available dates:", error);
    }
  };

  const fetchSlots = async (selectedDate) => {
    setLoading(true);
    try {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      const response = await axios.get(
        `/api/slots/available?date=${formattedDate}`,
        { withCredentials: true }
      );
      setSlots(response.data.data);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
    setLoading(false);
  };

  const handleDateChange = (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    if (availableDates.includes(formattedDate)) {
      setDate(selectedDate);
      fetchSlots(selectedDate);
    }
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const handleSubmit = async () => {
    if (!selectedSlot) {
      alert("Please select a time slot!");
      return;
    }

    try {
      await axios.post(
        `/api/slots/select/${selectedSlot._id}`,
        {},
        { withCredentials: true }
      );
      alert("Slot booked successfully!");
      setSelectedSlot(null);
      fetchSlots(date);
    } catch (error) {
      console.error("Error booking slot:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  const handleReady = async () => {
    if (!selectedSlot) {
      alert("Please select a time slot first!");
      return;
    }

    try {
      await axios.post(
        `/api/slots/ready/${selectedSlot._id}`,
        {},
        { withCredentials: true }
      );
      alert("Slot marked as ready!");
    } catch (error) {
      console.error("Error marking slot as ready:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="container">
      <div className="Int-heading">Interview Slot</div>
      <div className="booking-wrapper">
        <section className="calendar-section">
          <Calendar
            onChange={handleDateChange}
            value={null}
            tileDisabled={({ date }) =>
              !availableDates.includes(date.toISOString().split("T")[0])
            }
          />
        </section>

        <section className="slots-section">
          <h3>Available Slots</h3>
          {loading ? (
            <p>Loading slots...</p>
          ) : slots.length > 0 ? (
            <div className="slots-container">
              {slots.map((slot, index) => (
                <button
                  key={index}
                  className={`slot-button ${
                    selectedSlot === slot ? "selected" : ""
                  }`}
                  onClick={() => handleSlotSelection(slot)}
                >
                  {new Date(slot.time).toLocaleTimeString()}
                </button>
              ))}
            </div>
          ) : (
            <p>No slots available</p>
          )}
        </section>
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        Book Slot
      </button>
    </div>
  );
}
