import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
function Rating({rating}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((star) => {
        if (rating >= star) {
          return <FaStar key={star} color="#f5a623" />;
        } else if (rating >= star - 0.5) {
          return <FaStarHalfAlt key={star} color="#f5a623" />;
        } else {
          return <FaRegStar key={star} color="#ccc" />;
        }
      })}
    </div>
  )
}

export default Rating
