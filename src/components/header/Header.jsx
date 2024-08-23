import React, { useState } from "react";
import moment from "moment";
import Modal from "../modal/Modal";
import "./header.scss";

const Header = ({ weekStartDate, setWeekStartDate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const startOfWeek = moment(weekStartDate);
  const endOfWeek = moment(weekStartDate).add(6, "days");

  const getDisplayedDate = () => {
    const startMonth = startOfWeek.format("MMM");
    const startYear = startOfWeek.format("YYYY");

    const endMonth = endOfWeek.format("MMM");
    const endYear = endOfWeek.format("YYYY");

    if (startYear === endYear) {
      if (startMonth === endMonth) {
        return `${startMonth} ${startYear}`;
      } else {
        return `${startMonth} - ${endMonth} ${startYear}`;
      }
    } else {
      return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
    }
  };

  const handlePrevWeek = () => {
    setWeekStartDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 7);
      return newDate;
    });
  };

  const handleNextWeek = () => {
    setWeekStartDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 7);
      return newDate;
    });
  };

  const handleToday = () => {
    setWeekStartDate(new Date());
  };

  return (
    <header className="header">
      <button className="button create-event-btn" onClick={openModal}>
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
        <span className="navigation__displayed-week">{getDisplayedDate()}</span>
      </div>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </header>
  );
};

export default Header;
