import React from "react";
import Cart from "./components/Cart";
import ArticleList from "./components/ArticleList";
import Categories from "./components/Categories";
import Search from "./components/Search";

export default function App() {
    const [cartItems, setCartItems] = React.useState([]);
    const [cartState, setCartState] = React.useState(undefined);
    const [products, setProducts] = React.useState([]);
    const [isLoadingData, setIsLoadingData] = React.useState(true);
    const [isMaxProductsLoaded, setIsMaxProductsLoaded] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [throttledSearchTerm, setThrottledSearchTerm] = React.useState("")
    const [timeoutId, setTimeoutId] = React.useState(null)

    // Funkce pro načtení dat z URL
    const fetchData = () => {
        const nextSkip = products.length;
        setIsLoadingData(true);
        const url = `https://dummyjson.com/products${
            selectedCategory ? `/category/${selectedCategory}` : ""
        }${
            throttledSearchTerm ? `/search?q=${throttledSearchTerm}&` : "?"
        }limit=4&skip=${nextSkip}`
        fetch(url)
            .then((res) => res.json())
            .then((fetchedData) => {
                setProducts(prevProducts => [...prevProducts, ...fetchedData.products]);
                setIsLoadingData(false);
                // Pokud bylo načteno maximum produktů, nastavíme isMaxProductsLoaded na true
                if (fetchedData.total <= products.length + fetchedData.products.length) {
                    setIsMaxProductsLoaded(true);
                }
            })
            .catch(() => setIsLoadingData(false));
    };

    // Funkce pro aktualizaci košíku
    const updateCart = (item, quantity) => {
        fetch('https://dummyjson.com/carts/1', {
            method: 'PUT', // nebo 'PATCH' podle vaší potřeby
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                merge: true, // this will include existing products in the cart
                products: [
                    {
                        id: item.id,
                        quantity: quantity,
                    },
                ],
            }),
        })
    };

    // Přidá konkrétní položky do košíku
    const handleAddToCart = (item) => {
        setCartItems(cartItems.concat(item));
        updateCart(item, 1);
    };

    // Odstraní položku z košíku
    const handleRemoveFromCart = (item) => {
        const updatedCart = cartItems.filter(i => i !== item);
        setCartItems(updatedCart);
        updateCart(item, 0);
    };

    // Funkce pro načtení dalších dat
    const handleLoadMore = () => {
        fetchData()
    };

    // Funkce pro výběr kategorie
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSearchTerm(""); 
        setThrottledSearchTerm("")
        setProducts([])
        setIsMaxProductsLoaded(false)
    };

    // Funkce pro vyhledávání
    const handleSearch = (term) => {
        setSearchTerm(term);
        setSelectedCategory(null);
        setProducts([]);
        setIsMaxProductsLoaded(false);
        clearTimeout(timeoutId)
        setTimeoutId(setTimeout(() => {
            setThrottledSearchTerm(term)
        }, 450))
    };

    React.useEffect(() => {
        fetchData();
    }, [selectedCategory, throttledSearchTerm])

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
                        <Categories 
                            handleCategorySelect={handleCategorySelect}
                            searchTerm={searchTerm} 
                            selectedCategory={selectedCategory}
                        />
                        <Search 
                            handleSearch={handleSearch}
                            searchTerm={searchTerm}
                        />
                        <ArticleList
                            products={products}
                            cartItems={cartItems}
                            handleAddToCart={handleAddToCart}
                            isCheckoutLoading={cartState === "isLoading"}
                            handleLoadMore={handleLoadMore}
                            isLoadingData={isLoadingData}
                            isMaxProductsLoaded={isMaxProductsLoaded}
                            throttledSearchTerm={throttledSearchTerm}
                            timeoutId={timeoutId}
                        />
                    </>
                )}
            </section>
        </main>
    );
}
