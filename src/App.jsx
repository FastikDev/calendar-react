import React, { useEffect, useState } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";
import { fetchEvent } from "./gateway/eventsGateway.js";
import "./common.scss";

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  useEffect(() => {
    fetchEvent().then(setEvents);
  }, []);
  return (
    <>
      <Header
        weekStartDate={weekStartDate}
        setWeekStartDate={setWeekStartDate}
        setEvents={setEvents}
      />
      <Calendar weekDates={weekDates} events={events} setEvents={setEvents} />
    </>
  );
};

export default App;
