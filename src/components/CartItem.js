import { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import QuantityInput from "./QuantityInput";
import { getDiscountedPrice } from '../utilities';

export default function CartItem({ item }) {
    const { removeAllFromCart, updateCartProductQuantity } = useContext(CartContext);
    const [inputValue, setInputValue] = useState(item.quantity);

    useEffect(() => {
        setInputValue(item.quantity);
    }, [item.quantity]);

    const handleQuantityChange = (newValue) => {
        setInputValue(newValue);
        updateCartProductQuantity(item, newValue);
    };

    const handleIncrement = () => {
        handleQuantityChange(inputValue + 1);
    };

    const handleDecrement = () => {
        if (inputValue > 1) {
            handleQuantityChange(inputValue - 1);
        }
    };

    const remainingStock = item.stock - item.quantity;

    const getTotalPriceForProduct = () => {
        return item.price * item.quantity;
    };

    return (
        <li className="list-group-item d-flex align-items-center gap-3 justify-content-between flex-wrap flex-sm-nowrap">
            <div className="ratio ratio-4x3 w-25 flex-grow-1">
                <img
                    src={item.thumbnail}
                    className="d-block object-fit-cover img-thumbnail"
                    alt=""
                />
            </div>
            <div className="w-100">
                {item.title}
            </div>
            <div className="d-flex justify-content-end align-items-center gap-2 w-100">
                <QuantityInput
                    inputValue={inputValue}
                    handleQuantityChange={handleQuantityChange}
                    remainingStock={remainingStock}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                />
                <button
                    onClick={() => removeAllFromCart(item)} className="btn btn-outline-primary btn-sm">Remove from cart
                </button>
                <div className="d-flex flex-column align-items-end w-25">
                    <span className="text-decoration-line-through">€{getTotalPriceForProduct()}</span>
                    <span className="fs-5 fw-bold">€{getDiscountedPrice(getTotalPriceForProduct(), item.discountPercentage)}</span>
                </div>
            </div>
        </li>
    );
}
