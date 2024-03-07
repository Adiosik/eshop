import React from "react";

export default function Article({ item, handleAddToCart, isInCart, isCheckoutLoading }) {
    return (
        <article className="card h-100">
            <div className="ratio ratio-4x3">
                <img
                    src={item.thumbnail}
                    className="card-img-top d-block object-fit-cover"
                    alt=""
                />
            </div>
            <div className="card-body">
                <header>
                    <h3 className="card-title">{item.title}</h3>
                </header>
                <p className="card-text">Price: €{item.price}</p>
                <button
                    onClick={() => handleAddToCart(item)}
                    className={`btn btn-outline-primary`}
                    disabled={isInCart || isCheckoutLoading}
                >
                    {isInCart ? "Added to cart" : "Add to cart"}
                </button>
            </div>
        </article>
    )
}
