import React from "react";
import Article from "./Article";
import data from "../data";

export default function ArticleList({onAddToCart}) {
    const cards = data.map(item => {
        return (
            <div key={item.id} className="col-md-3">
                <Article item={item} onAddToCart={onAddToCart} /> {/* Předá funkci pro přidání do košíku */}
            </div>
        )
    })

    return (
        <div className="container text-center">
            <div className="row row-gap-4 align-content-stretch">
                {cards}
            </div>
        </div>
    )
}
