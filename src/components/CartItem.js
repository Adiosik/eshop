import React from "react";
import { CartContext } from "./CartProvider";

export default function CartItem({ item }) {
    const {handleRemoveFromCart} = React.useContext(CartContext)

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>{item.title} €{item.price}</span>
            <div className="col-auto">
                <button onClick={() => handleRemoveFromCart(item)} className="btn btn-outline-primary btn-sm">Remove from cart</button>
            </div>
        </li>
    )
}
