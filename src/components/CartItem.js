import React from "react";
import { CartContext } from "./CartProvider";
import QuantityInput from "./QuantityInput";
import { calculateDiscountedPrice } from '../utilities';

export default function CartItem({ item }) {
    const { handleRemoveFromCart, handleAddToCart, handleRemoveAllFromCart, updateCartItemQuantity } = React.useContext(CartContext)

    const totalPriceForItem = item.price * item.quantity;

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
                    item={item}
                    handleRemoveFromCart={handleRemoveFromCart}
                    handleAddToCart={handleAddToCart}
                    updateCartItemQuantity={updateCartItemQuantity}
                />
                <button
                    onClick={() => handleRemoveAllFromCart(item)} className="btn btn-outline-primary btn-sm">Remove from cart
                </button>
                <div className="d-flex flex-column align-items-end w-25">
                    <span className="text-decoration-line-through">€{totalPriceForItem}</span>
                    <span className="fs-5 fw-bold">€{calculateDiscountedPrice(totalPriceForItem, item.discountPercentage)}</span>
                </div>
            </div>
        </li>
    )
}
