import React from "react";
import { CartContext } from "./CartProvider";

export default function Article({ item }) {
    const {handleAddToCart, cartItems, cartState} = React.useContext(CartContext)

    const isInCart= cartItems.some((cartItem) => cartItem.id === item.id)
    const isCheckoutLoading = cartState === "isLoading"
    const discountedPrice = Math.floor(item.price * (1 - item.discountPercentage / 100));

    return (
        <article className="card h-100 d-flex flex-column">
            <div className="ratio ratio-4x3">
                <img
                    src={item.thumbnail}
                    className="card-img-top d-block object-fit-cover"
                    alt=""
                />
            </div>
            <div className="card-body">
                <span className="card-text">{item.rating}</span>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-text">{item.description}</p>
            </div>
            <div className="
                card-footer 
                d-flex justify-content-between align-items-center bg-transparent 
                border-top-0 pb-3 gap-3"
            >
                <div className="d-flex flex-column gap-1">
                    <p className="mb-0 text-decoration-line-through">€{item.price}</p>
                    <p className="mb-0 text-primary fw-bold">€{discountedPrice}</p>
                </div>
                <button
                    onClick={() => handleAddToCart(item)}
                    className={`btn btn-outline-primary w-300`}
                    disabled={isInCart || isCheckoutLoading}
                >
                    {isInCart ? "Added to cart" : "Add to cart"}
                </button>
            </div>
        </article>
    )
}
