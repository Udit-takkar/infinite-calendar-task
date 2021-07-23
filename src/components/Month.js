import React from "react";
import Day from "./Day";
import "../css/Month.css";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { getPosts, fetchPosts } from "../features/calendar";

function Month({ month, top, date, visibileDate }) {
  const posts = useSelector(getPosts);
  return (
    <div
      className="Month__wrapper"
      style={{
        transform: `translateY(${top})`,
      }}
    >
      <div className="Month_container">
        {month.map((week, index) => {
          return (
            <div
              className="week"
              style={{ height: `calc(100% / 5)` }}
              key={uuidv4()}
            >
              {week.map((day, index) => {
                return (
                  <Day
                    key={uuidv4()}
                    day={day}
                    posts={posts}
                    date={date}
                    index={index}
                    visibileDate={visibileDate}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Month;
