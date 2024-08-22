import React, { useState, useEffect } from "react";
import moment from "moment";
import { generateWeekRange, getWeekStartDate } from "../../utils/dateUtils";
import Modal from "../modal/Modal";
import "./header.scss";

import Navigation from './Navigation'; // Импорт компонента Navigation

const Header = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);

  const updateDisplayedWeek = (date) => {
    const startOfWeek = getWeekStartDate(date);
    const newWeekDates = generateWeekRange(startOfWeek);
    setWeekDates(newWeekDates);
  };

  useEffect(() => {
    updateDisplayedWeek(currentDate);
  }, [currentDate]);

  const handlePrevWeek = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 7);
      return newDate;
    });
  };

  const handleNextWeek = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 7);
      return newDate;
    });
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div>
      <header className="header">
        <button className="button create-event-btn">
          <i className="fas fa-plus create-event-btn__icon"></i>Create
        </button>
        <div className="navigation">
          <button className="navigation__today-btn button" onClick={handleToday}>Today</button>
          <button className="icon-button navigation__nav-icon" onClick={handlePrevWeek}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="icon-button navigation__nav-icon" onClick={handleNextWeek}>
            <i className="fas fa-chevron-right"></i>
          </button>
          <span className="navigation__displayed-week">
            {weekDates.length > 0 && moment(weekDates[0]).format('MMM YYYY')} - {moment(weekDates[6]).format('MMM YYYY')}
          </span>
        </div>
      </header>
      <Navigation weekDates={weekDates} />
    </div>
  );
};

export default Header;