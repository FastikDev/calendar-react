import React from "react";
import Navigation from "./../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";
import "./calendar.scss";
import { getDisplayMoth, getWeekStartDate } from "../../utils/dateUtils";

const Calendar = ({ weekDates, events, setEvents }) => {
  const month = getDisplayMoth(getWeekStartDate(weekDates));

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            month={month}
            events={events} // Массив events передается в Week через пропс events
            setEvents={setEvents}
          />
        </div>
      </div>
    </section>
  );
};

export default Calendar;