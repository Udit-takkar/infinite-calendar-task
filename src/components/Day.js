import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import format from "date-fns/format";
import "../css/Day.css";
import { getMonth, isSameMonth } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../features/calendar";
import Rating from "./Rating";
import LegendCodes from "./LegendCodes";
import { openModal } from "../features/modal";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function Day({ day, date, index, posts }) {
  const [showPost, setShowPost] = useState(false);
  const [calendarPost, setPost] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    posts.forEach((post) => {
      const postDate = new Date(post.calendardatetime);
      if (
        day.getDate() === postDate.getDate() &&
        day.getMonth() === postDate.getMonth() &&
        day.getFullYear() === postDate.getFullYear()
      ) {
        setPost(post);
        setShowPost(true);
      }
    });
  }, []);

  function dayFontWeight(D) {
    if (isSameMonth(D, date)) {
      return 700;
    } else {
      return 200;
    }
  }
  return (
    <div
      className="day"
      style={{
        backgroundColor: `${index === 0 ? "#B0C4DE" : "#ffffff"}`,
        cursor: `${showPost ? "pointer" : null}`,
      }}
      onClick={
        showPost
          ? () => dispatch(openModal({ id: calendarPost.id, posts }))
          : null
      }
    >
      {format(day, "d") === "1" ? (
        <span>
          <strong>{`${format(day, "d")} ${months[getMonth(day)]}`}</strong>
        </span>
      ) : (
        <span style={{ fontWeight: `${dayFontWeight(day)} ` }}>
          {format(day, "d")}
        </span>
      )}
      {showPost && (
        <div className="day__container">
          <Rating rating={calendarPost.rating} />
          <img
            className="day__image"
            src={calendarPost.media[0].mediaurl}
            alt="post"
          ></img>
          <div className="day__legendCodes">
            <LegendCodes typeofday={calendarPost.typeofday} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Day;
