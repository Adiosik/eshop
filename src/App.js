import React from "react";
import Cart from "./components/Cart";
import ArticleList from "./components/ArticleList";

export default function App() {
    const [cartItems, setCartItems] = React.useState([]);
    const [cartState, setCartState] = React.useState(undefined);
    const [products, setProducts] = React.useState(undefined);
    const [isLoadingData, setIsLoadingData] = React.useState(true);

    // Přidá konkrétní položky do košíku
    const handleAddToCart = (item) => {
        setCartItems(cartItems.concat(item));
    };

    // Odstraní položku z košíku
    const handleRemoveFromCart = (itemToRemove) => {
        const updatedCart = cartItems.filter(item => item !== itemToRemove);
        setCartItems(updatedCart);
    };

    // Načtení dat z DummyJSON
    React.useEffect(() => {
        fetch("https://dummyjson.com/products?limit=4")
            .then((res) => res.json())
            .then((fetchedData) => {
                    setProducts(fetchedData.products);
                    setIsLoadingData(false);
            })
            .catch(() => setIsLoadingData(false));
    }, []);

    // Funkce pro načtení dalších dat
    const handleLoadMore = () => {
        setIsLoadingData(true);
        const nextSkip = products.length;

        fetch(`https://dummyjson.com/products?limit=4&skip=${nextSkip}`)
            .then((res) => res.json())
            .then((fetchedData) => {
                setProducts(prevProducts => [...prevProducts, ...fetchedData.products]);
                setIsLoadingData(false); // Nastavíme isLoadingData na false, protože načítání dat skončilo
            })
            .catch(() => setIsLoadingData(false));
    };

    return (
        <main>
            <section className="container mt-4">
                <header>
                    <h1>E-shop</h1>
                </header>
                {products === undefined ? (
                    <div className="alert alert-info mt-4">Please wait while we load data...</div>
                ) : (
                    <>
                        <Cart
                            cartItems={cartItems}
                            handleRemoveFromCart={handleRemoveFromCart}
                            setCartItems={setCartItems}
                            cartState={cartState}
                            setCartState={setCartState}
                        />
                        <ArticleList
                            products={products}
                            cartItems={cartItems}
                            handleAddToCart={handleAddToCart}
                            isCheckoutLoading={cartState === "isLoading"}
                            handleLoadMore={handleLoadMore}
                            isLoadingData={isLoadingData}
                        />
                    </>
                )}
            </section>
        </main>
    );
}
