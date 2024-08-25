import React, { useState } from "react";
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

  const [showDeleteBnt, setShowDeleteBtn] = useState(false);

  const handleDelete = (id) => {
    deleteEvent(id).then(() => fetchEvent().then(setEvents));
  };

  const onDelete = (event) => {
    event.stopPropagation();
    handleDelete(id);
    setShowDeleteBtn(false);
  };

  const toggleDeleteBnt = () => {
    setShowDeleteBtn(!showDeleteBnt);
  };

  return (
    <div style={eventStyle} className="event" onClick={toggleDeleteBnt}>
      {showDeleteBnt && (
        <button className="delete-event-btn" onClick={onDelete}>
          <i className="fas fa-trash"></i>Delete
        </button>
      )}
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      <div className="event__description">{description}</div>
    </div>
  );
};

export default Event;
