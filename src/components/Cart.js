import React from "react";

export default function Cart({ cartItems }) {
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };
    
    if (cartItems.length === 0) {
        return (
            <div>
                <h2>Cart</h2>
                <p>Add something to your cart, make it from your heart.</p>
            </div>
        );
    }

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
        </div>
    )
}
