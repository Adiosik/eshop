import { useState, useEffect, useRef } from "react";
import ProductList from "./components/ProductList";
import Categories from "./components/Categories";
import Search from "./components/Search";
import { CartContextProvider } from "./components/CartContext";
import OffcanvasMenu from "./components/OffCanvasMenu";
import { debounceCallback } from "./utilities";

export default function App() {
    const [products, setProducts] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isMaxProductsLoaded, setIsMaxProductsLoaded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [throttledSearchTerm, setThrottledSearchTerm] = useState("")
    const [isProductsFound, setIsProductsFound] = useState(true);
    const searchRef = useRef(null);

    const fetchData = () => {
        const nextSkip = products.length;
        setIsLoadingData(true);
        const url = `https://dummyjson.com/products${selectedCategory ? `/category/${selectedCategory}` : ""
            }${throttledSearchTerm ? `/search?q=${throttledSearchTerm}&` : "?"
            }limit=8&skip=${nextSkip}`
        fetch(url)
            .then((res) => res.json())
            .then((fetchedData) => {
                if (fetchedData.products.length === 0) {
                    setIsProductsFound(false)
                } else {
                    setIsProductsFound(true)
                }
                setProducts(prevProducts => [...prevProducts, ...fetchedData.products]);
                setIsLoadingData(false);
                if (fetchedData.total <= products.length + fetchedData.products.length) {
                    setIsMaxProductsLoaded(true);
                }
            })
            .catch(() => setIsLoadingData(false));
    };

    const loadMore = () => {
        fetchData()
    };

    const onCategorySelect = (category) => {
        setSelectedCategory(category);
        setThrottledSearchTerm("")
        setProducts([])
        setIsMaxProductsLoaded(false)
        searchRef.current.resetInput()
    };

    const onSearch = debounceCallback((term) => {
        setSelectedCategory(null);
        setProducts([]);
        setIsMaxProductsLoaded(false);
        setThrottledSearchTerm(term);
    });

    useEffect(() => {
        fetchData();
    }, [selectedCategory, throttledSearchTerm])

    return (
        <CartContextProvider>
            <header>
                <nav className="navbar bg-secondary-subtle">
                    <div className="container-md d-flex flex-nowrap gap-3">
                        <h1 className="navbar-brand mb-0 me-0">
                            <a href="/" className="text-decoration-none text-reset">E-shop</a>
                        </h1>
                        <Search
                            ref={searchRef}
                            onSearch={onSearch}
                        />
                        <OffcanvasMenu />
                    </div>
                </nav>
            </header>
            <main className="container-md">
                <div className="row">
                    <Categories
                        handleCategorySelect={onCategorySelect}
                        selectedCategory={selectedCategory}
                    />
                    {isLoadingData ? (
                        <div className="col mb-5 mt-4">
                            <div className="alert alert-info">Please wait while we load data...</div>
                        </div>
                    ) : (
                        <ProductList
                            products={products}
                            loadMore={loadMore}
                            isLoadingData={isLoadingData}
                            isMaxProductsLoaded={isMaxProductsLoaded}
                            throttledSearchTerm={throttledSearchTerm}
                            isProductsFound={isProductsFound}
                            selectedCategory={selectedCategory}
                        />
                    )}
                </div>
            </main>
        </CartContextProvider>
    );
}
