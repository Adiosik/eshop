import React from "react";

export default function Categories({ handleCategorySelect, selectedCategory, searchTerm }) {
    const [categories, setCategories] = React.useState([]);
    const [showAllArticlesVisible, setShowAllArticlesVisible] = React.useState(false);
    
    React.useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(fetchedData => {
                setCategories(fetchedData);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    React.useEffect(() => {
        if (selectedCategory) {
            setShowAllArticlesVisible(true);
        } else {
            setShowAllArticlesVisible(false);
        }
    }, [selectedCategory]);

    if (!searchTerm) {
        return (
            <div className="col-12 col-md-auto">
                <h2>Categories</h2>
                <div className="list-group list-group-flush flex-row flex-md-column flex-wrap">
                    {showAllArticlesVisible && (
                        <button
                            key="showAll"
                            type="button"
                            className={`list-group-item list-group-item-action list-group-item-secondary w-auto ${!selectedCategory ? 'active' : ''}`}
                            onClick={() => handleCategorySelect(null)}
                        >
                            Show all articles
                        </button>
                    )}
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`list-group-item list-group-item-action w-auto ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => handleCategorySelect(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        );
    } else {
        return null;
    }
}
