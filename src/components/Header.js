import { format, getYear, getMonth } from "date-fns";
import React, { useState, useEffect } from "react";
import WeekDays from "./WeekDays";
import "../css/Header.css";

function Header({ headerDate }) {
  console.log("Header", headerDate);
  const [date, setDate] = useState(headerDate);

  useEffect(() => {
    setDate(headerDate);
  }, [headerDate]);
  return (
    <div>
      <div className="Header__textContainer">
        <h2 className="Header__heading">
          <span id="my">my </span>hair diary
        </h2>
        <h2 className="Header__Date">
          <span className="Header__date__Month">{format(date, "LLL")}</span>
          <span className="Header__date__Year"> {format(date, "yyyy")}</span>
        </h2>
      </div>
      <WeekDays />
    </div>
  );
}

export default Header;
