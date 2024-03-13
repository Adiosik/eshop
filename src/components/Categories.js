import React from "react";

export default function Categories({ handleCategorySelect }) {
    const [categories, setCategories] = React.useState([]);

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

    return (
        <section className="mt-4">
            {categories.map((category, index) => (
                <button 
                    key={index} 
                    type="button" 
                    className="btn btn-secondary mr-3"
                    onClick={() => handleCategorySelect(category)}
                >
                    {category}
                </button>
            ))}
        </section>
    );
}
