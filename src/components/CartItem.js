import React from "react";
import { CartContext } from "./CartProvider";
import { calculateDiscountedPrice } from '../utilities';

export default function CartItem({ item }) {
    const { handleRemoveFromCart, handleAddToCart, handleRemoveAllFromCart, updateCartItemQuantity } = React.useContext(CartContext)

    const totalPriceForItem = item.price * item.quantity;
    const remainingStock = item.stock - item.quantity;

    return (
        <li className="list-group-item d-flex align-items-center gap-3 justify-content-between flex-wrap flex-sm-nowrap">
            <div className="ratio ratio-4x3 w-25">
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
