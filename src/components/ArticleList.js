import React from "react";
import Article from "./Article";

export default function ArticleList({ data, cartItems, handleAddToCart, isCheckoutLoading }) {
    const cards = data.map(item => {
        return (
            <div key={item.id} className="col-6 col-md-4 col-lg-3">
                <Article 
                    item={item} 
                    handleAddToCart={handleAddToCart}
                    isInCart={cartItems.some(cartItem => cartItem.id === item.id)} // Kontrola, zda je položka již v košíku
                    isCheckoutLoading={isCheckoutLoading}
                />
            </div>
        )
    })

    return (
        <section className="container mb-5 text-center">
            <h2 className="visually-hidden">Lamps</h2>
            <div className="row row-gap-4 align-content-stretch">
                {cards} {/* Zobrazení karet s položkami */}
            </div>
        </section>
    )
}
