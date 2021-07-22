import React from "react";

function Rating({ rating }) {
  const stars = [];
  for (let i = 0; i < rating; ++i) {
    stars.push("⭐️");
  }
  return (
    <div>
      {stars.map((star) => {
        return <span>{star}</span>;
      })}
    </div>
  );
}

export default Rating;
