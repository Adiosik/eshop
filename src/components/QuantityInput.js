import React from "react";
import { CartContext } from "./CartProvider";

export default function QuantityInput({ item }) {
    const { handleRemoveFromCart, handleAddToCart, updateCartItemQuantity } = React.useContext(CartContext);
    const [inputValue, setInputValue] = React.useState(item.quantity);

    React.useEffect(() => {
        setInputValue(item.quantity);
    }, [item.quantity])

    const handleInputChange = (e) => {
        let value = e.target.value
        value = value.replace(/[^\d]/g, '');
        value = Math.abs(parseInt(value)) || '';
    
        setInputValue(value);
        updateCartItemQuantity(item, value)
    }

    const remainingStock = item.stock - item.quantity

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
                value={inputValue}
                onChange={handleInputChange}
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
