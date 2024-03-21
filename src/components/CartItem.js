import React from "react";
import { CartContext } from "./CartProvider";

export default function CartItem({ item }) {
    const {handleRemoveFromCart} = React.useContext(CartContext)

    return (
        <li className="list-group-item d-flex align-items-center gap-3 justify-content-between">
            <span>{item.title} €{item.price}</span>
            <div className="col-auto">
                <button onClick={() => handleRemoveFromCart(item)} className="btn btn-outline-primary btn-sm">Remove from cart</button>
            </div>
        </li>
    )
}
