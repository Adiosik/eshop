import React from "react";

export default function Cart({ cartItems }) {
    return (
        <div>
            <h2>Cart</h2>
            <ul>
                {cartItems.map((item, index) => (
                    <li 
                        key={index}>{item.title} - €{item.price}
                    </li>
                ))}
            </ul>
        </div>
    )
}
