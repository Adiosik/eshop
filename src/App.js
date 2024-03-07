import React from "react";
import Cart from "./components/Cart";
import ArticleList from "./components/ArticleList";

export default function App() {
    const [cartItems, setCartItems] = React.useState([])
    const [cartState, setCartState] = React.useState(undefined)
    const [data, setData] = React.useState(undefined)
    const [isLoadingData, setIsLoadingData] = React.useState(true)

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
        fetch("https://dummyjson.com/products?limit=8")
            .then((res) => res.json())
            .then((fetchedData) => {
                setData(fetchedData);
                setIsLoadingData(false); // Při dokončení načítání dat změníme stav na false
            })
            .catch(() => setIsLoadingData(false)); // V případě chyby také změníme stav na false
    }, [])

    // Funkce pro načtení dalších dat
    const handleLoadMore = () => {
        const nextSkip = data.products.length

        fetch(`https://dummyjson.com/products?limit=8&skip=${nextSkip}`)
            .then((res) => res.json())
            .then((fetchedData) => {
                setData(prevData => ({ ...prevData, products: [...prevData.products, ...fetchedData.products] }));
            });
    }

    return (
        <main>
            <section className="container mt-5">
                <header>
                    <h1>E-shop</h1>
                </header>
                <article className="row align-items-center">
                    <div className="col mt-4">
                        {isLoadingData ? (
                            <div className="alert alert-info">Please wait while we load data...</div>
                        ) : (
                            <Cart 
                                cartItems={cartItems} // Zobrazení košíku
                                handleRemoveFromCart={handleRemoveFromCart} // Odstraní položku z košíku
                                setCartItems={setCartItems}
                                cartState={cartState}
                                setCartState={setCartState}
                            />
                        )}
                    </div>
                </article>
                <section className="container mt-4">
                    {isLoadingData ? null : (
                        <ArticleList 
                            data={data} 
                            cartItems={cartItems}
                            handleAddToCart={handleAddToCart}
                            isCheckoutLoading={cartState === "isLoading"}
                            handleLoadMore={handleLoadMore}
                        />
                    )}
                </section>
            </section>
        </main>
    )
}
