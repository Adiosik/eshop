import React, { useState, useEffect } from "react";
import ShowAllProducts from "./ShowAllProducts";
import { formatCategoryName } from "../utilities";

export default function Categories({ handleCategorySelect}) {
    const [categories, setCategories] = useState([]);
    const [showAllProductsVisible, setShowAllProductsVisible] = useState(false);

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
            setShowAllProductsVisible(true);
        } else {
            setShowAllProductsVisible(false);
        }
    }, [handleCategorySelect]);

    return (
        <div className="col-12 col-md-auto mt-4">
            <h2 className="visually-hidden">Categories</h2>
            <div className="list-group list-group-flush flex-row flex-md-column flex-wrap">
                {showAllProductsVisible && (
                    <ShowAllProducts
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
