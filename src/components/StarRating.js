import React from "react";
import "./StarRating.css";

export default function StarRating({ rating }) {
    const percentFilled = (rating / 5) * 100;

    const stars = Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className="star">&#x2605;</span>
    ));

    return (
        <div className="star-rating">
            <div className="stars-empty">{stars}</div>
            <div className="stars-full" style={{ width: `${percentFilled}%` }}>{stars}</div>
        </div>
    );
}
