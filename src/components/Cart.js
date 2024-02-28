import React from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

export default function Cart({ cartItems, handleRemoveFromCart, setCartItems }) {
    const [showEmailInput, setShowEmailInput] = React.useState(false)
    const [orderSent, setOrderSent] = React.useState(false)
    // checkoutForm, orderSent, undifinde

    // Funkce pro výpočet celkové ceny v košíku
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0)
    }

    // Funkce pro odeslání objednávky
    const onSubmit = () => {
        setOrderSent(true) // Objednávka byla odeslána
        setShowEmailInput(false) // Skryje zprávu pro dokončení objednávky
        setCartItems([])
    }

    // Efekt pro zobrazení košíku
    React.useEffect(() => {
        if (cartItems.length === 0) {
            setShowEmailInput(false) // Košík je prázdný, skryje zprávu pro dokončení objednávky
            setOrderSent(false) // Košík je prázdný, skryje zelenou zprávu o odeslání objednávky
        }
    }, [cartItems])

    return (
        <section>
            {orderSent && (
                // Zobrazení zelené hlášky po odeslání objednávky
                <section>
                    <p className="alert alert-success">Your order was sent. Thank you.<br />You can buy more if you want now.</p>
                </section>
            )}
            {cartItems.length === 0 && (
                <section>
                    <p className="h2">Cart</p>
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
                    {showEmailInput ? (
                        <Checkout onSubmit={onSubmit} />
                    ) : (
                        <button onClick={() => setShowEmailInput(true)} className="btn btn-primary btn-lg mt-3">Checkout</button>
                    )}
                </section>
            )}
        </section>
    )
}
