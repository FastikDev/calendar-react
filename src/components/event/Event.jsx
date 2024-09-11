import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { deleteEvent, fetchEvent } from '../../gateway/eventsGateway';
import './event.scss';
import { canDeleteEvent } from '../../utils/validation';
import moment from 'moment';

const Event = ({ id, height, marginTop, title, time, description, setEvents }) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  const handleDelete = id => {
    if (!canDeleteEvent(time)) {
      return;
    }

    deleteEvent(id).then(() => fetchEvent().then(setEvents));
  };

  const onDelete = event => {
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

Event.propTypes = {
  id: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  setEvents: PropTypes.func.isRequired,
};

export default Event;
