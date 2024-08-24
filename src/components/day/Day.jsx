import React from "react";
import Hour from "../hour/Hour";

const Day = ({ dataDay, dayEvents, setEvents, month }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map((hour) => {
        // Получаем все события для текущего часа
        const hourEvents = dayEvents.filter(
          (event) => event.dateFrom.getHours() === hour
        );

        return (
          <Hour
            key={`${dataDay}-${hour}`}
            dataHour={hour}
            hourEvents={hourEvents} // Массив событий для часа передается в Hour через пропс hourEvents
            setEvents={setEvents}
            dataDay={dataDay}
            month={month}
          />
        );
      })}
    </div>
  );
};

export default Day;