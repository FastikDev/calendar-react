import React, { useState } from "react";
import { deleteEvent, fetchEvent } from "../../gateway/eventsGateway";
import "./event.scss";
import moment from "moment";

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

  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  const handleDelete = (id) => {
    const currentTime = moment();
    const eventStartTime = moment(time, "HH:mm");
    const thresholdTime = eventStartTime.clone().subtract(15, "minutes");

    // Проверка, если текущее время больше или равно пороговому времени
    if (currentTime.isSameOrAfter(thresholdTime)) {
      alert("You cannot delete an event less than 15 minutes before it starts");
      return;
    }

    deleteEvent(id).then(() => fetchEvent().then(setEvents));
  };

  const onDelete = (event) => {
    event.stopPropagation();
    handleDelete(id);
    setShowDeleteBtn(false);
  };

  const toggleDeleteBtn = () => {
    setShowDeleteBtn(!showDeleteBtn);
  };

  return (
    <div style={eventStyle} className="event" onClick={toggleDeleteBtn}>
      {showDeleteBtn && (
        <button className="delete-event-btn" onClick={onDelete}>
          <i className="fas fa-trash"></i> Delete
        </button>
      )}
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      <div className="event__description">{description}</div>
    </div>
  );
};

export default Event;
