import React from "react";

export default function CartItem({ item }) {
  return (
        <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>{item.title} €{item.price}</span>
                <button className="btn btn-outline-primary btn-sm">Remove</button>
            </li>
        </ul>
    );
}
