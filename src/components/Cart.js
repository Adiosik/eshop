import React from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

export default function Cart({ cartItems, handleRemoveFromCart }) {
    const [showEmailInput, setShowEmailInput] = React.useState(false)
    const [orderSent, setOrderSent] = React.useState(false);

    // Funkce pro výpočet celkové ceny v košíku
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0)
    }

    // Funkce pro odeslání objednávky
    const onSubmit = () => {
        setOrderSent(true);
    }

    // Podmíněné vykreslení zprávy o odeslání objednávky nebo seznamu položek v košíku a formuláře pro e-mail
    return (
        <div>
            {/* Podmínka pro zobrazení objednávky odeslané */}
            {orderSent && (
                <div>
                    <p className="alert alert-success">Your order was sent. Thank you. You can buy more if you want now.</p>
                    <p className="h2">Cart</p>
                    <p>Add something to your cart, make it from your heart.</p>
                </div>
            )}

            {/* Podmínka pro zobrazení košíku */}
            {!orderSent && (
                <div>
                    <p className="h2">Cart</p>
                    {/* Podmínka pro prázdný košík */}
                    {cartItems.length === 0 ? (
                        <p>Add something to your cart, make it from your heart.</p>
                    ) : (
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
                    )}

                    {/* Podmínka pro zobrazení formuláře pro e-mail a tlačítka Checkout */}
                    {!showEmailInput ? (
                        <button onClick={() => setShowEmailInput(true)} className="btn btn-primary btn-lg mt-3">Checkout</button>
                    ) : (
                        <Checkout onSubmit={onSubmit} />
                    )}    
                </div>
            )}
        </div>
    )
}
