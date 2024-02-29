import React from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

export default function Cart({ cartItems, handleRemoveFromCart, setCartItems }) {
    const [cartState, setCartState] = React.useState(undefined)

    // Funkce pro výpočet celkové ceny v košíku
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0)
    }

    // Funkce pro odeslání objednávky
    const onSubmit = () => {
        setCartState("orderSent") // Objednávka byla odeslána
        setCartItems([]); // Vyprázdní košík
    }

    // Efekt pro zobrazení košíku
    React.useEffect(() => {
        if (cartItems.length > 0) {
            setCartState(undefined) // Košík není prázdný
        }
    }, [cartItems])

    return (
        <section>
            {cartState === "orderSent" && (
                // Zobrazení zelené hlášky po odeslání objednávky
                <section>
                    <p className="alert alert-success">Your order was sent. Thank you.<br />You can buy more if you want now.</p>
                </section>
            )}
            {cartItems.length === 0 && (
                <section>
                    <h2>Cart</h2>
                    <p>Add something to your cart, make it from your heart.</p>
                </section>
            )}
            {cartItems.length > 0 && (
                <section>
                    <h2>Cart</h2>
                    <ul className="list-group">
                        {/* Vykreslení seznamu položek v košíku pomocí komponenty CartItem */}
                        {cartItems.map((item, index) => (
                            <CartItem
                                key={index}
                                item={item}
                                handleRemoveFromCart={handleRemoveFromCart}
                            />
                        ))}
                        <li className="list-group-item d-flex justify-content-between align-items-center">Total: ${getTotalPrice()}</li>
                    </ul>
                    {/* Tlačítko "Checkout" zobrazí formulář pro e-mail a Place order */}
                    {cartState === "checkoutForm" ? (
                        <Checkout onSubmit={onSubmit} />
                    ) : (
                        <button onClick={() => setCartState("checkoutForm")} className="btn btn-primary btn-lg mt-3">Checkout</button>
                    )}
                </section>
            )}
        </section>
    )
}
