import React from "react";

export default function ShowAllArticlesButton({ onClick, selectedCategory }) {
    return (
        <button
            type="button"
            className={`list-group-item list-group-item-action list-group-item-secondary w-auto ${!selectedCategory ? 'active' : ''}`}
            onClick={onClick}
        >
            Show all articles
        </button>
    );
}
