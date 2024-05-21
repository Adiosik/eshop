import React from "react";
import { CartContext } from "./CartProvider";
import { calculateDiscountedPrice } from '../utilities';
import StarRating from './StarRating';
import ArticleCarousel from './ArticleCarousel';

export default function Article({ item }) {
    const { addToCart, cartItems, cartState, isCheckoutLoading, findProductInCart } = React.useContext(CartContext)

    const isCartLoading = isCheckoutLoading(cartState);
    const findCartItem = findProductInCart(cartItems, item.id);
    const availableStock = findCartItem ? item.stock - findCartItem.quantity : item.stock;

    return (
        <article className="card h-100 d-flex flex-column">
            <div className="ratio ratio-4x3">
                <ArticleCarousel images={item.images} />
            </div>
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between gap-2">
                    <StarRating rating={item.rating} />
                    <span className="card-text fw-bold">{item.rating}</span>
                    <p className="card-text badge text-bg-secondary">-{item.discountPercentage}%</p>
                </div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-text">{item.description}</p>
            </div>
            <div className="
                card-footer 
                d-flex justify-content-between align-items-end bg-transparent 
                border-top-0 pb-3 gap-3"
            >
                <div className="d-flex flex-column">
                    <p className="card-text">Stock: {availableStock}</p>
                    <p className="mb-0 text-decoration-line-through">€{item.price}</p>
                    <p className="mb-0 text-primary fs-3 fw-bold">€{calculateDiscountedPrice(item.price, item.discountPercentage)}</p>
                </div>
                {availableStock > 0 ? (
                    <button
                        onClick={() => addToCart(item)}
                        className={`btn btn-outline-primary`}
                        disabled={isCartLoading}
                    >
                        Add to cart
                    </button>
                ) : (
                    <p className="text-danger">Out of stock</p>
                )}
            </div>
        </article>
    )
}
