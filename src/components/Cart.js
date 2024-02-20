import React from "react";
import CartItem from "./CartItem"; // Import nové komponenty CartItem

export default function Cart({ cartItems }) {
    // Funkce pro výpočet celkové ceny v košíku
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };
    
    // Pokud je košík prázdný, zobrazí se zpráva o prázdném košíku
    if (cartItems.length === 0) {
        return (
            <div>
                <p className="h2">Cart</p>
                <p>Add something to your cart, make it from your heart.</p>
            </div>
        );
    }

    // Pokud košík není prázdný, zobrazí se seznam položek a celková cena
    return (
        <div>
            <p className="h2">Cart</p>
            <ul>
                {/* Vykreslení seznamu položek v košíku pomocí komponenty CartItem */}
                {cartItems.map((item, index) => (
                    <CartItem key={index} item={item} />
                ))}
            </ul>
            <p>Total: ${getTotalPrice()}</p>
            <button className="btn btn-primary btn-lg">Checkout</button>
        </div>
    );
}
