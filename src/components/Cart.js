import React from "react";

export default function Cart({ cartItems }) {
    // Funkce pro výpočet celkové ceny v košíku
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };
    
    // Pokud je košík prázdný, zobrazí se zpráva o prázdném košíku
    if (cartItems.length === 0) {
        return (
            <div>
                <h2>Cart</h2>
                <p>Add something to your cart, make it from your heart.</p>
            </div>
        );
    }

    // Pokud košík není prázdný, zobrazí se seznam položek a celková cena
    return (
        <div>
            <h2>Cart</h2>
            <ul>
                {cartItems.map((item, index) => (
                    <li 
                        key={index}>{item.title} - €{item.price}
                    </li>
                ))}
            </ul>
            <p>Total: ${getTotalPrice()}</p>
            <button className="btn btn-primary">Checkout</button>
        </div>
    );
}
