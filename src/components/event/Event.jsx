import React from "react";
import "./event.scss";

const Event = ({
  id,
  height,
  marginTop,
  title,
  time,
  description,
  testEvents,
  setEvents,
}) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const handleDelete = () => {
    const updatedEvents = testEvents.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };

  return (
    <div style={eventStyle} className="event">
      <button className="delete-event-btn" onClick={handleDelete}></button>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      <div className="event__description">{description}</div>
    </div>
  );
};

export default Event;
