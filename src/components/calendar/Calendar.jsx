import React from "react";
import Navigation from "./../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";
import "./calendar.scss";
import { getDisplayMonth } from "../../utils/dateUtils";

const Calendar = ({ weekDates, events, setEvents }) => {
  const month = getDisplayMonth(weekDates[0]);

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            month={month}
            events={events}
            setEvents={setEvents}
          />
        </div>
      </div>
    </section>
  );
};

export default Calendar;
