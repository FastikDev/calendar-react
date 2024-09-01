import React from "react";
import Modal from "../modal/Modal";
import useModal from "../../hooks/useModal";
import { getDisplayMonth } from "../../utils/dateUtils";
import "./header.scss";

const Header = ({ weekStartDate, setWeekStartDate, setEvents }) => {
  const { isModalOpen, openModal, closeModal, dateStart } = useModal();

  const updateWeekStartDate = (offset) => {
    setWeekStartDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + offset);
      return newDate;
    });
  };

  const handlePrevWeek = () => updateWeekStartDate(-7);

  const handleNextWeek = () => updateWeekStartDate(7);

  const handleToday = () => {
    setWeekStartDate(new Date());
  };

  const handleCreateClick = () => {
    openModal(new Date().toISOString());
  };

  return (
    <header className="header">
      <button className="button create-event-btn" onClick={handleCreateClick}>
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
        <span className="navigation__displayed-week">
          {getDisplayMonth(weekStartDate)}
        </span>
      </div>
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          setEvents={setEvents}
          dateStart={dateStart}
        />
      )}
    </header>
  );
};

export default Header;
