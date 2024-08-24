import React from "react";
import Day from "../day/Day";
import "./week.scss";

const Week = ({ weekDates, events, setEvents, month }) => {
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        // Получаем все события для текущего дня
        const dayEvents = events.filter(
          (event) =>
            new Date(event.dateFrom) >= dayStart &&
            new Date(event.dateFrom) < dayEnd
        );

        return (
          <Day
            key={dayStart}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents} // Массив событий для дня передается в Day через пропс dayEvents
            setEvents={setEvents}
            month={month}
          />
        );
      })}
    </div>
  );
};

export default Week;