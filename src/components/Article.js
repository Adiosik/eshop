import React from "react";

export default function Article({ item, handleAddToCart, isInCart, isCheckoutLoading }) {
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
                <h3 className="card-title">{item.title}</h3>
                <p className="card-text">{item.description}</p>
            </div>
            <div className="
                card-footer 
                d-flex justify-content-between align-items-center bg-transparent 
                border-top-0 pb-3"
            >
                <p className="mb-0">€{item.price}</p>
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
