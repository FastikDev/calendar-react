import React, { useEffect, useState } from "react";
import { deleteEvent, fetchEvent } from "../../gateway/eventsGateway";
import "./event.scss";
import { canDeleteEvent } from "../../utils/validation";
import moment from "moment";

const Event = ({
  id,
  height,
  marginTop,
  title,
  time, // Время в формате "HH:mm - HH:mm"
  description,
  setEvents,
}) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  useEffect(() => {
    const currentTime = moment();

    const [, endTimeStr] = time.split(" - ");
    const eventEndTime = moment(
      `${currentTime.format("YYYY-MM-DD")} ${endTimeStr}`,
      "YYYY-MM-DD HH:mm"
    );

    if (currentTime.isAfter(eventEndTime)) {
      console.log("Event has ended. Deleting event with ID:", id);
      deleteEvent(id).then(() => fetchEvent().then(setEvents));
    }
  }, [id, time, setEvents]);

  const handleDelete = (id) => {
    if (!canDeleteEvent(time)) {
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
