import React, { useEffect, useState } from "react";
import Header from "./components/header/Header.jsx";
import PropTypes from "prop-types";
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

App.propTypes = {
  weekStartDate: PropTypes.instanceOf(Date),
  setWeekStartDate: PropTypes.func.isRequired,
  setEvents: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  weekDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
};

export default App;
