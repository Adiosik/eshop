import React from "react";
import { CartContext } from "./CartProvider";

export default function QuantityInput({ item }) {
    const { onRemoveFromCart, onAddToCart, onUpdateCartProductQuantity } = React.useContext(CartContext);
    const [inputValue, setInputValue] = React.useState(item.quantity);

    React.useEffect(() => {
        setInputValue(item.quantity);
    }, [item.quantity])

    const onInputChange = (e) => {
        let value = e.target.value
        value = value.replace(/[^\d]/g, '');

        setInputValue(value);
        onUpdateCartProductQuantity(item, value)
    }

    const remainingStock = item.stock - item.quantity

    return (
        <div className="input-group input-group-sm w-25 flex-nowrap">
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => onRemoveFromCart(item)}
            >
                −
            </button>
            <input
                type="text"
                className="form-control text-center w-auto"
                value={inputValue}
                onChange={onInputChange}
            />
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => onAddToCart(item)}
                disabled={remainingStock <= 0}
            >
                +
            </button>
        </div>
    )
}
