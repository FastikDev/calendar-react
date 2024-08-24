import React from "react";
import "./event.scss";

const Event = ({ height, marginTop, title, time, description, testEvents }) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const handleDelete = (id) => {
    testEvents.filter((event) => event.id !== id);
  };

  return (
    <div style={eventStyle} className="event">
      <button className="event__close-btn" onClick={handleDelete}>
        X
      </button>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      <div className="event__description">{description}</div>
    </div>
  );
};

export default Event;
