import React from "react";
import Event from "../event/Event";
import Modal from "../modal/Modal.jsx";
import RedTimeLine from "../redTimeLine/RedTimeLine.jsx";
import { formatMins } from "../../../src/utils/dateUtils.js";
import useModal from "../../hooks/useModal";
import "./hour.scss";
import moment from "moment-timezone";

const Hour = ({ dataHour, hourEvents, setEvents, dataDay, month }) => {
  const { openModal, isModalOpen, closeModal, dateStart } = useModal();

  const handleSlotClick = (event) => {
    const clickedElement = event.currentTarget;
    const clickedDataDay = clickedElement.getAttribute("data-day");
    const clickedDataHour = clickedElement.getAttribute("data-time");

    if (hourEvents.length !== 0) {
      return;
    }

    const today = moment();

    const date = moment.tz(
      {
        year: today.year(),
        month: today.month(), // Месяцы в moment.js начинаются с 0
        day: Number(clickedDataDay),
        hour: Number(clickedDataHour),
        minute: 0,
        second: 0,
        millisecond: 0,
      },
      "Europe/Kiev"
    );

    if (date.hour() < 2) {
      date.add(1, "day");
    }

    const isoString = date.format();
    console.log("Created ISO Date:", isoString);

    openModal(isoString);
  };

  return (
    <div
      className="calendar__time-slot"
      data-time={dataHour}
      data-day={dataDay}
      onClick={handleSlotClick}
    >
      {hourEvents.map(({ id, dateFrom, dateTo, title, description }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(
          dateFrom.getMinutes()
        )}`;
        const eventEnd = `${dateTo.getHours()}:${formatMins(
          dateTo.getMinutes()
        )}`;
        const eventSize = (dateTo.getTime() - dateFrom.getTime()) / (1000 * 60);

        return (
          <Event
            key={id}
            height={eventSize}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            description={description}
            setEvents={setEvents}
            id={id}
          />
        );
      })}
      {dataHour === new Date().getHours() && (
        <RedTimeLine dataDay={dataDay} month={month} />
      )}
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          setEvents={setEvents}
          dateStart={dateStart}
        />
      )}
    </div>
  );
};

export default Hour;
