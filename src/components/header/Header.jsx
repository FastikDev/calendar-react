import React, { useState, useEffect } from "react";
import moment from "moment";
import { generateWeekRange, getWeekStartDate } from "../../utils/dateUtils";
import Modal from "../modal/Modal";
import "./header.scss";

const Header = () => {
  const [displayedMonth, setDispalayedMoth] = useState("");
  const [currentDate, setCurrenDate] = useState(new Date());

  const updateDisplayedMonth = (date) => {
    const startOfWeek = getWeekStartDate(date);
    const weekRange = generateWeekRange(startOfWeek);

    const startMonth = moment(weekRange[0]).format("MMM");
    const endMonth = moment(weekRange[6]).format("MMM");

    setDispalayedMoth(
      startMonth === endMonth ? startMonth : `${startMonth} - ${endMonth}`
    );
  };

  useEffect(() => {
    updateDisplayedMonth(currentDate);
  }, [currentDate]);

  const handlePrevWeek = () => {
    setCurrenDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 7);
      return newDate;
    });
  };

  const handleNextWeek = () => {
    setCurrenDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 7);
      return newDate;
    });
  };

  const handleToday = () => {
    setCurrenDate(new Date());
  };

  return (
    <header className="header">
      <button className="button create-event-btn">
        <i className="fas fa-plus create-event-btn__icon" id="colored-plus"></i>
        Create
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button" onClick={handleToday}>
          Today
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={handlePrevWeek}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={handleNextWeek}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">{displayedMonth}</span>
      </div>
    </header>
  );
};

export default Header;
