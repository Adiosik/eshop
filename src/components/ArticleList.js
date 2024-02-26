import React from "react";
import Article from "./Article";

export default function ArticleList({ data, cartItems, handleAddToCart, orderSent }) {
    const cards = data.map(item => {
        return (
            <div key={item.id} className="col-lg-3 col-md-4 col-sm-6">
                <Article 
                    item={item} 
                    handleAddToCart={handleAddToCart}
                    isInCart={cartItems.some(cartItem => cartItem.id === item.id)} // Kontrola, zda je položka již v košíku
                    orderSent={orderSent}
                />
            </div>
        )
    })

    return (
        <section className="container text-center">
            <div className="row row-gap-4 align-content-stretch">
                {cards} {/* Zobrazení karet s položkami */}
            </div>
        </section>
    )
}
