import React from "react";

export default function QuantityInput({ inputValue, handleInputChange, onIncrement, onDecrement, remainingStock }) {
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
                onChange={(e) => handleInputChange(parseInt(e.target.value) || '')}
            />
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onIncrement}
                disabled={remainingStock <= 0}
            >
                +
            </button>
        </div>
    )
}
