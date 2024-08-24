import React from "react";
import Event from "../event/Event";
import { formatMins } from "../../../src/utils/dateUtils.js";
import "./hour.scss";

const Hour = ({ dataHour, hourEvents, setEvents, testEvents }) => {
  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
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
            setEvents={setEvents} // Пропс setEvents передается в Event
            id={id}
            testEvents={testEvents}
          />
        );
      })}
    </div>
  );
};

export default Hour;
