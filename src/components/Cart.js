import React from "react";
import CartItem from "./CartItem";
import EmailInput from "./Checkout";
import Checkout from "./Checkout";

export default function Cart({ cartItems, handleRemoveFromCart }) {
    const [showEmailInput, setShowEmailInput] = React.useState(false)

    // Zobrazí formulář pro e-mail
    const handleCheckout = () => {
        setShowEmailInput(true)
    }

    // Funkce pro výpočet celkové ceny v košíku
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0)
    }

    // Pokud je košík prázdný, zobrazí se zpráva o prázdném košíku
    if (cartItems.length === 0) {
        return (
            <div>
                <p className="h2">Cart</p>
                <p>Add something to your cart, make it from your heart.</p>
            </div>
        )
    }

    // Pokud košík není prázdný, zobrazí se seznam položek a celková cena
    return (
        <div>
            <p className="h2">Cart</p>
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
            {/* Tlačítko "Checkout" zobrazí formulář pro e-mail pouze tehdy, když je showEmailInput true */}
            {showEmailInput && (
                <Checkout />
            )}    
            <button onClick={handleCheckout} className="btn btn-primary btn-lg">Checkout</button>
        </div>
    )
}
