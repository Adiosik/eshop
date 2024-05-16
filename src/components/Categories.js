import React from "react";
import ShowAllArticles from "./ShowAllArticles";

export default function Categories({ onCategorySelect, selectedCategory, searchTerm }) {
    const [categories, setCategories] = React.useState([]);
    const [showAllArticlesVisible, setShowAllArticlesVisible] = React.useState(false);

    React.useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(fetchedData => {
                const formattedCategories = fetchedData.map(category => (category.charAt(0).toUpperCase() + category.slice(1)).replaceAll("-", " "));
                setCategories(formattedCategories);
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
            <div className="col-12 col-md-auto mt-4">
                <h2 className="visually-hidden">Categories</h2>
                <div className="list-group list-group-flush flex-row flex-md-column flex-wrap">
                    {showAllArticlesVisible && (
                        <ShowAllArticles
                            onClick={() => onCategorySelect(null)}
                            selectedCategory={selectedCategory}
                        />
                    )}
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`list-group-item list-group-item-action w-auto ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => onCategorySelect(category)}
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
