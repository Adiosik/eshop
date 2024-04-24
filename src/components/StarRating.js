import React from "react";
import "./StarRating.css";

export default function StarRating({ rating }) {
    const percentFilled = (rating / 5) * 100;

    return (
        <div className="star-rating">
            <div className="stars-empty">
                <span className="star">&#x2605;</span>
                <span className="star">&#x2605;</span>
                <span className="star">&#x2605;</span>
                <span className="star">&#x2605;</span>
                <span className="star">&#x2605;</span>
            </div>
            <div className="stars-full" style={{ width: `${percentFilled}%` }}>
                <span className="star">&#x2605;</span>
                <span className="star">&#x2605;</span>
                <span className="star">&#x2605;</span>
                <span className="star">&#x2605;</span>
                <span className="star">&#x2605;</span>
            </div>
        </div>
    );
}
