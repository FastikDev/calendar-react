import React from "react";
import Day from "../day/Day";
import "./week.scss";

const Week = ({ month, events, setEvents, weekDates }) => {
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart);
        dayEnd.setHours(dayEnd.getHours() + 24);

        // getting all events from the day we will render
        const dayEvents = events.filter(
          (event) => new Date(event.dateFrom) >= dayStart && new Date(event.dateFrom) < dayEnd
        );

        return (
          <Day
            key={dayStart.getDate()}
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