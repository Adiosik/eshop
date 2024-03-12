import React from "react";
import Cart from "./components/Cart";
import ArticleList from "./components/ArticleList";

export default function App() {
    const [cartItems, setCartItems] = React.useState([]);
    const [cartState, setCartState] = React.useState(undefined);
    const [products, setProducts] = React.useState([]);
    const [isLoadingData, setIsLoadingData] = React.useState(true);
    const [isMaxProductsLoaded, setIsMaxProductsLoaded] = React.useState(false);

    // Přidá konkrétní položky do košíku
    const handleAddToCart = (item) => {
        setCartItems(cartItems.concat(item));
    };

    // Odstraní položku z košíku
    const handleRemoveFromCart = (itemToRemove) => {
        const updatedCart = cartItems.filter(item => item !== itemToRemove);
        setCartItems(updatedCart);
    };

    // Funkce pro načtení dat z URL
    const fetchData = () => {
        const nextSkip = products.length;
        setIsLoadingData(true);
        fetch(`https://dummyjson.com/products?limit=60&skip=${nextSkip}`)
            .then((res) => res.json())
            .then((fetchedData) => {
                if (!isMaxProductsLoaded) {
                    setProducts(prevProducts => [...prevProducts, ...fetchedData.products]);
                }
                setIsLoadingData(false);
                // Pokud bylo načteno maximum produktů, nastavíme isMaxProductsLoaded na true
                if (fetchedData.total <= products.length + fetchedData.products.length) {
                    setIsMaxProductsLoaded(true);
                }
            })
            .catch(() => setIsLoadingData(false));
    };    

    // Načtení dat z DummyJSON při prvním zobrazení
    React.useEffect(() => {
        fetchData()
    }, []);

    // Funkce pro načtení dalších dat
    const handleLoadMore = () => {
        if (!isMaxProductsLoaded) {
            fetchData()
        }
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
                            isMaxProductsLoaded={isMaxProductsLoaded}
                        />
                    </>
                )}
            </section>
        </main>
    );
}
