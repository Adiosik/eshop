import React from "react";

export default function CartItem({ item }) {
    return (
        <li>
            {item.title} - €{item.price}
        </li>
    );
}
