import React from "react";
import Day from "../day/Day";
import "./week.scss";

const Week = ({ weekDates, events = [], setEvents, month }) => {
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        const dayEvents = Array.isArray(events)
          ? events.filter(
              (event) =>
                new Date(event.dateFrom) >= dayStart &&
                new Date(event.dateFrom) < dayEnd
            )
          : [];

        return (
          <Day
            key={dayStart}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            setEvents={setEvents}
            month={month}
          />
        );
      })}
    </div>
  );
};

export default Week;
