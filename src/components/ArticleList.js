import React from "react";
import Article from "./Article";

export default function ArticleList({ data, cartItems, handleAddToCart }) {
    const cards = data.map(item => {
        return (
            <div key={item.id} className="col-md-3">
                <Article 
                    item={item} 
                    handleAddToCart={handleAddToCart}
                    isInCart={cartItems.some(cartItem => cartItem.id === item.id)} // Kontrola, zda je položka již v košíku
                />
            </div>
        )
    })

    return (
        <div className="container text-center">
            <div className="row row-gap-4 align-content-stretch">
                {cards} {/* Zobrazení karet s položkami */}
            </div>
        </div>
    )
}
