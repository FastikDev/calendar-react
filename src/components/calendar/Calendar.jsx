// Calendar.jsx
import React, { useState, useEffect } from "react";
import Navigation from "./../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";
import events from "../../gateway/events";
import { generateWeekRange, getWeekStartDate } from "../../utils/dateUtils";
import moment from "moment";
import "./calendar.scss";

const Calendar = ({ weekDates, events, setEvents }) => {
  const [eventsState] = useState(events);

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week weekDates={weekDates} events={events} setEvents={setEvents}/>
        </div>
      </div>
    </section>
  );
};

export default Calendar;
