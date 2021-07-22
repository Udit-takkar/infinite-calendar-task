import React from "react";
import "../css/WeekDays.css";

function WeekDays() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <div className="WeekDays_wrapper">
      {days.map((day, index) => (
        <div key={index} className="WeekDays_wrapper_day">
          {day}
        </div>
      ))}
    </div>
  );
}

export default WeekDays;
