import React from "react";
import Event from "../event/Event";
import Modal from "../modal/Modal.jsx";
import RedTimeLine from "../redTimeLine/RedTimeLine.jsx";
import { formatMins } from "../../../src/utils/dateUtils.js";
import useModal from "../../hooks/useModal";
import "./hour.scss";

const Hour = ({ dataHour, hourEvents, setEvents, dataDay, month }) => {
  const { openModal, isModalOpen, closeModal, dateStart } = useModal();

  const handleSlotClick = () => {
    if (hourEvents.length !== 0) {
      return;
    }

    console.log("dataDay type:", typeof dataDay);
    console.log("dataDay value:", dataDay);

    const [year, month, day] = dataDay.split('-').map(Number);
const date = new Date(year, month - 1, day);
    
    console.log("Initial date object:", date);

    date.setHours(dataHour);
    date.setMinutes(0);

    const isoString = date.toISOString();
    console.log("ISO string:", isoString);

    openModal(isoString);
  };

  return (
    <div
      className="calendar__time-slot"
      data-time={dataHour + 1}
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
