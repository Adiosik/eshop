import React from "react";
import { CartContext } from "./CartProvider";
import { calculateDiscountedPrice } from '../utilities';

export default function CartItem({ item }) {
    const {handleRemoveFromCart, handleAddToCart, handleRemoveAllFromCart, updateCartItemQuantity} = React.useContext(CartContext)

    const totalPriceForItem = calculateDiscountedPrice(item.price, item.discountPercentage) * item.quantity;

    return (
        <li className="list-group-item d-flex align-items-center gap-3 justify-content-between">
            <div className="d-flex align-items-center">
                <span>{item.title} €{totalPriceForItem}</span>
            </div>
            <div className="d-flex gap-2">
                <div className="input-group input-group-sm">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => handleRemoveFromCart(item)}
                    >
                        -
                    </button>
                    <input
                        type="number"
                        className="form-control text-center"
                        value={item.quantity}
                        onChange={(e) => updateCartItemQuantity(item, parseInt(e.target.value))}
                    />
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => handleAddToCart(item)}
                    >
                        +
                    </button>
                </div>
                <button onClick={() => handleRemoveAllFromCart(item)} className="btn btn-outline-primary btn-sm">Remove from cart</button>
            </div>
        </li>
    )
}
