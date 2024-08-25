import React from "react";
import { deleteEvent, fetchEvent } from "../../gateway/eventsGateway";
import "./event.scss";

const Event = ({
  id,
  height,
  marginTop,
  title,
  time,
  description,
  setEvents,
}) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const handleDelete = (id) => {
    deleteEvent(id).then(() => fetchEvent().then(setEvents));
  };

  const onDelete = (event) => {
    event.stopPropagation();
    handleDelete(id);
  };

  return (
    <div style={eventStyle} className="event">
      <button className="delete-event-btn" onClick={onDelete}></button>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      <div className="event__description">{description}</div>
    </div>
  );
};

export default Event;
