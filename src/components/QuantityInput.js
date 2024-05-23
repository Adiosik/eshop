import React from "react";

export default function QuantityInput({ inputValue, handleQuantityChange, onIncrement, onDecrement, remainingStock, onBlur }) {
    return (
        <div className="input-group input-group-sm w-25 flex-nowrap">
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onDecrement}
                disabled={inputValue <= 1}
            >
                −
            </button>
            <input
                type="text"
                className="form-control text-center w-auto"
                value={inputValue}
                onChange={(e) => handleQuantityChange(e.target.value)}
                onBlur={onBlur}
            />
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onIncrement}
                disabled={remainingStock <= 0 || remainingStock <= inputValue}
            >
                +
            </button>
        </div>
    )
}
