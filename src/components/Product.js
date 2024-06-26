import { useContext } from "react";
import { CartContext } from "./CartContext";
import { getDiscountedPrice } from '../utilities';
import StarRating from './StarRating';
import ProductCarousel from './ProductCarousel';

export default function Product({ item }) {
    const { addToCart, cartItems, cartState, isCheckoutLoading, findProductInCart } = useContext(CartContext)

    const isCartLoading = isCheckoutLoading(cartState);
    const findCartProduct = findProductInCart(cartItems, item.id);
    const availableStock = findCartProduct ? item.stock - findCartProduct.quantity : item.stock;

    return (
        <article className="card h-100 d-flex flex-column">
            <div className="ratio ratio-4x3">
                <ProductCarousel images={item.images} />
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
                    <p className="mb-0 text-primary fs-3 fw-bold">€{getDiscountedPrice(item.price, item.discountPercentage)}</p>
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
                    <p className="text-danger mb-2">Out of stock</p>
                )}
            </div>
        </article>
    )
}
