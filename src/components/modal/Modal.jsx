import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { createEvent, fetchEvent } from '../../gateway/eventsGateway';
import { validEvent } from '../../utils/validation';
import PropTypes from 'prop-types';
import './modal.scss';

const Modal = ({ dateStart, closeModal, setEvents }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  console.log(typeof dateStart);

  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    if (dateStart) {
      const date = moment(dateStart);
      if (date.isValid()) {
        const dateString = date.format('YYYY-MM-DD');
        const timeString = date.format('HH:mm');
        const endTimeDate = date.clone().add(1, 'hour');
        const endTimeString = endTimeDate.format('HH:mm');

        setFormData({
          ...formData,
          date: dateString,
          startTime: timeString,
          endTime: endTimeString,
        });
      }
    }
  }, [dateStart]);

  useEffect(() => {
    const isFormFilled = Object.values(formData).every(value => value.trim() !== '');
    setBtnDisabled(!isFormFilled);
  }, [formData]);

  const onCreate = newEvent => {
    fetchEvent()
      .then(events => {
        const eventList = Array.isArray(events) ? events : [];

        if (!validEvent(newEvent, eventList)) {
          return;
        }

        return createEvent(newEvent);
      })
      .then(() => fetchEvent())
      .then(updatedEvents => {
        setEvents(updatedEvents);
        closeModal();
      });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newEvent = {
      title: formData.title,
      description: formData.description,
      dateFrom: new Date(`${formData.date}T${formData.startTime}`).toISOString(),
      dateTo: new Date(`${formData.date}T${formData.endTime}`).toISOString(),
    };

    if (!validEvent(newEvent)) {
      return;
    }

    onCreate(newEvent);
    closeModal();
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button
            onClick={e => {
              e.stopPropagation();
              closeModal();
            }}
            className="create-event__close-btn"
          >
            +
          </button>
          <form className="event-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              value={formData.title}
              onChange={handleChange}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={formData.date}
                onChange={handleChange}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={formData.startTime}
                onChange={handleChange}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={formData.endTime}
                onChange={handleChange}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={formData.description}
              onChange={handleChange}
            />

            <button type="submit" className="event-form__submit-btn" disabled={btnDisabled}>
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setEvents: PropTypes.func.isRequired,
  dateStart: PropTypes.string.isRequired,
};
