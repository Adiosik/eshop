import React, { useState, useEffect } from "react";
import ShowAllArticles from "./ShowAllArticles";
import { formatCategoryName } from "../utilities";

export default function Categories({ handleCategorySelect}) {
    const [categories, setCategories] = useState([]);
    const [showAllArticlesVisible, setShowAllArticlesVisible] = useState(false);

    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(fetchedData => {
                setCategories(fetchedData);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    useEffect(() => {
        if (handleCategorySelect) {
            setShowAllArticlesVisible(true);
        } else {
            setShowAllArticlesVisible(false);
        }
    }, [handleCategorySelect]);

    return (
        <div className="col-12 col-md-auto mt-4">
            <h2 className="visually-hidden">Categories</h2>
            <div className="list-group list-group-flush flex-row flex-md-column flex-wrap">
                {showAllArticlesVisible && (
                    <ShowAllArticles
                        onClick={() => handleCategorySelect(null)}
                        selectedCategory={handleCategorySelect}
                    />
                )}
                {categories.map((category, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`list-group-item list-group-item-action w-auto ${handleCategorySelect === category ? 'active' : ''}`}
                        onClick={() => handleCategorySelect(category)}
                    >
                        {formatCategoryName(category)}
                    </button>
                ))}
            </div>
        </div>
    );
}
