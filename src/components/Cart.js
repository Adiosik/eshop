import React from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { CartContext } from "./CartProvider";
import { calculateDiscountedPrice } from '../utilities';

export default function Cart() {
    const [error, setError] = React.useState(undefined)
    const {setCartState, setCartItems, cartItems, cartState, getTotalPriceWithDiscount, getTotalRegularPrice, getTotalSavings, isLoadingCartData} = React.useContext(CartContext)

    const onSubmit = (email) => {
        setError(undefined)
        setCartState("isLoading")
        fetch("https://submit-form.com/Tupxo7vzc", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                email: email,
                items: cartItems.map(item => ({
                    id: item.id,
                    stock: item.stock,
                    title: item.title,
                    quantity: item.quantity,
                    price: item.price,
                    discount: item.discountPercentage,
                    discountedPrice: calculateDiscountedPrice(item.price, item.discountPercentage),
                })),
                total: getTotalPriceWithDiscount()
            }),
        })
            .then(function (response) {
                if (response.ok) {
                    setCartState("orderSent");
                    setCartItems([]);
                    console.log("Order sent successfully!");
                } else {
                    setError("Order submission failed: There might be a connectivity issue or an internal server error. Please try again later. " + response.status);
                    console.error("Failed to send order:", response.status);
                }
            })
            .catch(function (error) {
                setError("Error while sending order: There might be a connectivity issue or an internal server error. Please try again later. " + error);
                console.error("Error while sending order:", error);
            });
    }

    return (
        <article className="row align-items-center mb-4">
            <div className="col mt-4">
                {error && (
                    <section className="alert alert-danger" role="alert">
                        {error}
                    </section>
                )}
                {isLoadingCartData && (
                    <div className="alert alert-info mt-4">Loading cart data...</div>
                )}
                {cartState === "orderSent" && (
                    <section>
                        <p className="alert alert-success">Your order was sent. Thank you.<br />You can buy more if you want now.</p>
                    </section>
                )}
                <h2>Cart</h2>
                {cartItems.length === 0 ? (
                    <section>
                        <p>Add something to your cart, make it from your heart.</p>
                    </section>
                ) : (
                    <section>
                        <ul className="list-group">
                            {cartItems.map((item, index) => (
                                <CartItem
                                    key={index}
                                    item={item}
                                    disabled={cartState === "orderSent"}
                                />
                            ))}
                            <li className="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">
                                {cartState === "checkoutForm" || cartState === "isLoading" ? (
                                    <Checkout
                                        onSubmit={onSubmit}
                                        disabled={cartState === "isLoading"}
                                    />
                                ) : (
                                    <button onClick={() => setCartState("checkoutForm")} className="btn btn-primary btn-lg">Checkout</button>
                                )}
                                <div className="d-flex flex-column align-items-end">
                                    <span>Regular price: €{getTotalRegularPrice()}</span>
                                    <span>Discount: €{getTotalSavings()}</span>
                                    <span className="fw-bold">Total after discount: €{getTotalPriceWithDiscount()}</span>
                                </div>
                            </li>
                        </ul>
                    </section>
                )}
            </div>
        </article>
    )
}
