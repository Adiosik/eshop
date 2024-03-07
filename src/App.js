import React from "react";
import Cart from "./components/Cart";
import ArticleList from "./components/ArticleList";

export default function App() {
    const [cartItems, setCartItems] = React.useState([])
    const [cartState, setCartState] = React.useState(undefined)
    const [data, setData] = React.useState(undefined)

    // Přidá konkrétní položky do košíku
    const handleAddToCart = (item) => {
        setCartItems(cartItems.concat(item))
    }

    // Odstraní položku z košíku
    const handleRemoveFromCart = (itemToRemove) => {
        const updatedCart = cartItems.filter(item => item !== itemToRemove) // Vytvoří se nové pole bez odstraněné položky
        setCartItems(updatedCart) // Aktualizuje stav košíku
    }

    // Načtení dat z DummyJSON
    React.useEffect(() => {
        fetch("https://dummyjson.com/products?limit=3&skip=10")
            .then((res) => res.json())
            .then((fetchedData) => setData(fetchedData));
    }, [])

    return (
        <main>
            <section className="container mt-5">
                <h1>Homemade lighting</h1>
                <div className="row align-items-center">
                    <div className="col mt-4">
                        <Cart 
                            cartItems={cartItems} // Zobrazení košíku
                            handleRemoveFromCart={handleRemoveFromCart} // Odstraní položku z košíku
                            setCartItems={setCartItems}
                            cartState={cartState}
                            setCartState={setCartState}
                        />
                    </div>
                </div>
            </section>
            <section className="container mt-4">
                <ArticleList 
                    data={data} 
                    cartItems={cartItems}
                    handleAddToCart={handleAddToCart}
                    isCheckoutLoading={cartState === "isLoading"}
                />
            </section>
        </main>
    )
}
