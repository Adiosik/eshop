import React from "react";

export default function Search({ searchTerm, handleSearch }) {
    const handleChange = (event) => {
        handleSearch(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className="mt-2">
            <input
                type="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleChange}
            />
        </form>
    )
}
