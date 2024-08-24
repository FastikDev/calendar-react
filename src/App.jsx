import React, { useState } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";
import testEvents from "./gateway/testEvents.js";
import "./common.scss";

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [events, setEvents] = useState(testEvents); // Здесь массив testEvents сохраняется в состоянии
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  return (
    <>
      <Header
        weekStartDate={weekStartDate}
        setWeekStartDate={setWeekStartDate}
        testEvents={events}
        setEvents={setEvents}
      />
      <Calendar
        weekDates={weekDates}
        events={events} // Массив testEvents передается в Calendar через пропс events
        setEvents={setEvents}
        testEvents={events}
      />
    </>
  );
};

export default App;
