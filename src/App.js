import React from "react"
import data from "./data"
import Cart from "./components/Cart"
import ArticleList from "./components/ArticleList"

export default function App() {
    const [cartItems, setCartItems] = React.useState([]);

    // Přidá konkrétní položky do košíku
    const handleAddToCart = (item) => {
        setCartItems(cartItems.concat(item));
    }

    // Odstraní položku z košíku
    const handleRemoveFromCart = (itemToRemove) => {
        const updatedCart = cartItems.filter(item => item !== itemToRemove); // Vytvoří se nové pole bez odstraněné položky
        setCartItems(updatedCart); // Aktualizuje stav košíku
    }

    return (
        <main>
            <div className="container mt-5">
                <p className="h1">E-shop</p>
                <div className="row align-items-center">
                    <div className="col mt-4">
                        <Cart 
                            cartItems={cartItems} // Zobrazení košíku
                            handleRemoveFromCart={handleRemoveFromCart} // Odstraní položku z košíku
                        />
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <ArticleList 
                    data={data} 
                    cartItems={cartItems}
                    handleAddToCart={handleAddToCart}
                />
            </div>
        </main>
    )
}
