import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Day from "./Day";
import "../css/Month.css";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, fetchPosts } from "../features/calendar";

function Month({ month, top, date, visibileDate }) {
  const posts = useSelector(getPosts);
  return (
    <div
      style={{
        transform: `translateY(${top})`,
        position: "absolute",
        width: "100%",
        height: "900px",
      }}
    >
      <div className="Month_container">
        {month.map((week, index) => {
          return (
            <div
              className="week"
              style={{ height: `calc(100% / 5)` }}
              key={index}
            >
              {week.map((day, index) => {
                return (
                  <Day
                    key={uuidv4()}
                    day={day}
                    posts={posts}
                    date={date}
                    index={index}
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
