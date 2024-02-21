import React from "react"
import data from "./data"
import Cart from "./components/Cart"
import CartItem from "./components/CartItem"
import ArticleList from "./components/ArticleList"

export default function App() {
    const [cartItems, setCartItems] = React.useState([]);

    const handleAddToCart = (item) => {
        setCartItems(cartItems.concat(item)); // Přidá konkrétní do košíku
    }

    return (
        <main>
            <div className="container mt-5">
                <p className="h1">E-shop</p>
                <div className="row align-items-center">
                    <div className="col mt-4">
                        <Cart cartItems={cartItems} />
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <ArticleList onAddToCart={handleAddToCart}/>
            </div>
        </main>
    )
}
