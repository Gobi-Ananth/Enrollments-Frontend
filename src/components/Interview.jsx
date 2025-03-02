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
      const response = await axios.get(
        "Gobi backend api for the date fetching"
      );
      setAvailableDates(response.data);
    } catch (error) {
      console.error("Error fetching available dates:", error);
    }
  };

  const fetchSlots = async (selectedDate) => {
    setLoading(true);
    try {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      const response = await axios.get(
        `gobi backend api for the slots fetching=${formattedDate}`
      );
      setSlots(response.data);
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
      await axios.post("Gobi slot booking api", {
        date: date.toISOString().split("T")[0],
        time: selectedSlot,
      });

      alert("Slot booked successfully!");
      setSelectedSlot(null);
      fetchSlots(date);
    } catch (error) {
      console.error("Error booking slot:", error);
    }
  };

  return (
    <div className="container">
      <div className="Int-heading">Interview Slot</div>
      <div className="booking-wrapper">
        <section className="calendar-section">
          <Calendar
            onChange={handleDateChange}
            value={date}
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
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <p>No slots available</p>
          )}
        </section>
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
