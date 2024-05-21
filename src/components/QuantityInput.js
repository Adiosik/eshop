import React from "react";

export default function QuantityInput({ inputValue, handleInputChange, removeFromCart, addToCart, remainingStock }) {
    return (
        <div className="input-group input-group-sm w-25 flex-nowrap">
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={removeFromCart}
            >
                −
            </button>
            <input
                type="text"
                className="form-control text-center w-auto"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={addToCart}
                disabled={remainingStock <= 0}
            >
                +
            </button>
        </div>
    )
}
