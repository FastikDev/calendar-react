import React, { useEffect, useState } from "react";
import { getDisplayMonth } from "../../utils/dateUtils";
import "./redLine.scss";

const getTopPosition = () => {
  return `${new Date().getMinutes() - 2.5}px`;
};

const RedTimeLine = ({ dataDay, month }) => {
  const [style, setStyle] = useState({
    top: getTopPosition(),
  });

  console.log("Style:", style);

  useEffect(() => {
    const interval = setInterval(() => {
      setStyle({ top: getTopPosition() });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const now = new Date();

  const currentMonth = getDisplayMonth(now);
  const currentDay = now.getDate();

  if (currentDay !== dataDay || currentMonth !== month) {
    return null;
  }

  return (
    <div
      style={style}
      className="red-time"
      data-month={currentMonth}
      data-day={currentDay}
    >
      <div className="red-time__line"></div>
    </div>
  );
};

export default RedTimeLine;
