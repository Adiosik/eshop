import React from "react";
import { CartContext } from "./CartProvider";
import { calculateDiscountedPrice } from '../utilities';

export default function CartItem({ item }) {
    const {handleRemoveFromCart, handleAddToCart, handleRemoveAllFromCart, updateCartItemQuantity} = React.useContext(CartContext)

    const totalPriceForItem = item.price * item.quantity;
    const remainingStock = item.stock - item.quantity;

    return (
        <li className="list-group-item d-flex align-items-center gap-3 justify-content-between">
            <div className="flex-grow-1">
                <div>
                    {item.title}
                </div>
            </div>
            <div className="d-flex justify-content-end align-items-center gap-2">
                <div className="input-group input-group-sm w-25">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => handleRemoveFromCart(item)}
                        >
                        -
                    </button>
                    <input
                        type="text"
                        className="form-control text-center"
                        value={item.quantity}
                        onChange={(e) => updateCartItemQuantity(item, parseInt(e.target.value) || 1)}
                        />
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => handleAddToCart(item)}
                        disabled={remainingStock <= 0}
                        >
                        +
                    </button>
                </div>
                <button 
                    onClick={() => handleRemoveAllFromCart(item)} className="btn btn-outline-primary btn-sm">Remove from cart
                </button>
                <span className="text-decoration-line-through">€{totalPriceForItem}</span>
                <span className="fw-bold">€{calculateDiscountedPrice(totalPriceForItem, item.discountPercentage)}</span>
            </div>
        </li>
    )
}
