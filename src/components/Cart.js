import React from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

export default function Cart({ cartItems, handleRemoveFromCart, setCartItems, cartState, setCartState }) {
    const [error, setError] = React.useState(undefined)
    const [isLoadingCartData, setIsLoadingCartData] = React.useState(true)

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0)
    }

    React.useEffect(() => {
        fetch('https://dummyjson.com/carts/1')
            .then(res => res.json())
            .then(cartData => {
                setCartItems(cartData.products);
                setIsLoadingCartData(false);
            })
            .catch(error => {
                setError('Failed to fetch cart data: ' + error);
                setIsLoadingCartData(false);
            });
    }, []);

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
                    title: item.title,
                    price: item.price,
                })),
                total: getTotalPrice()
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

    React.useEffect(() => {
        const cartNotEmpty = cartItems.length
        if (cartNotEmpty) {
            setCartState(undefined);
        }
    }, [cartItems, setCartState]);

    return (
        <article className="row align-items-center">
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
                                    handleRemoveFromCart={handleRemoveFromCart}
                                    disabled={cartState === "orderSent"}
                                />
                            ))}
                            <li className="list-group-item d-flex justify-content-between align-items-center">Total: ${getTotalPrice()}</li>
                        </ul>
                        {cartState === "checkoutForm" || cartState === "isLoading" ? (
                            <Checkout
                                onSubmit={onSubmit}
                                disabled={cartState === "isLoading"}
                            />
                        ) : (
                            <button onClick={() => setCartState("checkoutForm")} className="btn btn-primary btn-lg mt-3">Checkout</button>
                        )}
                    </section>
                )}
            </div>
        </article>
    )
}
