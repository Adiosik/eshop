import React from "react";
import ArticleList from "./components/ArticleList";
import Categories from "./components/Categories";
import Search from "./components/Search";
import { CartContextProvider } from "./components/CartContext";
import OffcanvasMenu from "./components/OffCanvasMenu";
import { debounceCallback } from "./utilities";

export default function App() {
    const [products, setProducts] = React.useState([]);
    const [isLoadingData, setIsLoadingData] = React.useState(true);
    const [isMaxProductsLoaded, setIsMaxProductsLoaded] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [throttledSearchTerm, setThrottledSearchTerm] = React.useState("")
    const [isProductsFound, setIsProductsFound] = React.useState(true);

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

    const handleLoadMore = () => {
        fetchData()
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        //search
        setThrottledSearchTerm("")
        setProducts([])
        setIsMaxProductsLoaded(false)
    };

    const handleSearch = debounceCallback((term) => {
        setSelectedCategory(null);
        setProducts([]);
        setIsMaxProductsLoaded(false);
        setThrottledSearchTerm(term);
    });

    React.useEffect(() => {
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
                            onSearch={handleSearch}
                        />
                        <OffcanvasMenu />
                    </div>
                </nav>
            </header>
            <main className="container-md">
                <div className="row">
                    <Categories
                        handleCategorySelect={handleCategorySelect}
                        selectedCategory={selectedCategory}
                    />
                    {isLoadingData ? (
                        <div className="col mb-5 mt-4">
                            <div className="alert alert-info">Please wait while we load data...</div>
                        </div>
                    ) : (
                        <ArticleList
                            products={products}
                            onLoadMore={handleLoadMore}
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
