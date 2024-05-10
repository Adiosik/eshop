import React from "react";
import ArticleList from "./components/ArticleList";
import Categories from "./components/Categories";
import Search from "./components/Search";
import { CartContextProvider } from "./components/CartProvider";
import OffcanvasMenu from "./components/OffCanvasMenu";

export default function App() {
    const [products, setProducts] = React.useState([]);
    const [isLoadingData, setIsLoadingData] = React.useState(true);
    const [isMaxProductsLoaded, setIsMaxProductsLoaded] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [throttledSearchTerm, setThrottledSearchTerm] = React.useState("")
    const [timeoutId, setTimeoutId] = React.useState(null);
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
        setSearchTerm("");
        setThrottledSearchTerm("")
        setProducts([])
        setIsMaxProductsLoaded(false)
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        setSelectedCategory(null);
        setProducts([]);
        setIsMaxProductsLoaded(false);
        clearTimeout(timeoutId)
        setThrottledSearchTerm(term)
    };

    React.useEffect(() => {
        fetchData();
    }, [selectedCategory, throttledSearchTerm])

    return (
        <CartContextProvider>
            <header>
                <nav className="navbar bg-secondary-subtle">
                    <div className="container-md">
                        <h1 className="navbar-brand mb-0">
                            <a href="/" className="text-decoration-none text-reset">E-shop</a>
                        </h1>
                        <Search
                            searchTerm={searchTerm}
                            handleSearch={handleSearch}
                            isLoadingData={isLoadingData}
                        />
                        <OffcanvasMenu />
                    </div>
                </nav>
            </header>
            <main className="container-md">
                {products === undefined ? (
                    <div className="alert alert-info">Please wait while we load data...</div>
                ) : (
                    <>
                        <div className="row">
                            <Categories
                                handleCategorySelect={handleCategorySelect}
                                selectedCategory={selectedCategory}
                            />
                            <ArticleList
                                products={products}
                                handleLoadMore={handleLoadMore}
                                isLoadingData={isLoadingData}
                                isMaxProductsLoaded={isMaxProductsLoaded}
                                throttledSearchTerm={throttledSearchTerm}
                                timeoutId={timeoutId}
                                isProductsFound={isProductsFound}
                                selectedCategory={selectedCategory}
                            />
                        </div>
                    </>
                )}
            </main>
        </CartContextProvider>
    );
}
