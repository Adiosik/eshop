import React, { useState, useEffect } from "react";
import ShowAllProducts from "./ShowAllProducts";
import { formatCategoryName } from "../utilities";

export default function Categories({ handleCategorySelect, selectedCategory }) {
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
        if (selectedCategory !== null) {
            setShowAllProductsVisible(true);
        } else {
            setShowAllProductsVisible(false);
        }
    }, [selectedCategory]);

    return (
        <div className="col-12 col-md-auto mt-4">
            <h2 className="visually-hidden">Categories</h2>
            <div className="list-group list-group-flush flex-row flex-md-column flex-wrap">
                {showAllProductsVisible && (
                    <ShowAllProducts
                        onClick={() => handleCategorySelect(null)}
                        selectedCategory={selectedCategory}
                    />
                )}
                {categories.map((category, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`list-group-item list-group-item-action  w-auto ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => handleCategorySelect(category)}
                        disabled={selectedCategory === category}
                    >
                        {formatCategoryName(category)}
                    </button>
                ))}
            </div>
        </div>
    );
}
