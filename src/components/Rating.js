import React from "react";
import { v4 as uuidv4 } from "uuid";

function Rating({ rating }) {
  const stars = [];
  for (let i = 0; i < rating; ++i) {
    stars.push("⭐️");
  }
  return (
    <div>
      {stars.map((star) => {
        return <span key={uuidv4()}>{star}</span>;
      })}
    </div>
  );
}

export default Rating;
