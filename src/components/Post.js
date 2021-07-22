import React from "react";
import LegendCodes from "./LegendCodes";
import Rating from "./Rating";
import "../css/Post.css";
import format from "date-fns/format";

function Post({ id, rating, photo, text, date, typeofday }) {
  const currentDate = new Date(date);
  return (
    <div className="Post__container">
      <img alt="ph" src={photo} id="post__image"></img>
      <div className="Post__metadata__components">
        <LegendCodes typeofday={typeofday} />
        <Rating rating={rating} />
      </div>
      <div>
        <p style={{ fontWeight: 700, marginLeft: "8px" }}>
          {format(currentDate, "d")}
          <span> </span>
          {format(currentDate, "LLL")}
          <span> </span>
          {format(currentDate, "yyyy")}
        </p>
        <p className="Post__text">{text}</p>
      </div>
      <button className="viewPostBtn"> View Full Post</button>
    </div>
  );
}

export default Post;
