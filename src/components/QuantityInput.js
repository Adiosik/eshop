import React from "react";

export default function QuantityInput({ item, handleRemoveFromCart, handleAddToCart, updateCartItemQuantity }) {
    
    const remainingStock = item.stock - item.quantity;

    return (
        <div className="input-group input-group-sm w-25 flex-nowrap">
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => handleRemoveFromCart(item)}
            >
                -
            </button>
            <input
                type="text"
                className="form-control text-center w-auto"
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
    )
}
