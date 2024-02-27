import React from "react";

export default function CartItem({ item, handleRemoveFromCart}) {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>{item.title} €{item.price}</span>
            <button onClick={() => handleRemoveFromCart(item)} className="btn btn-outline-primary btn-sm">Remove from cart</button>
        </li>
    )
}
