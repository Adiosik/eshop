import React from "react";
import Article from "./Article";

export default function ArticleList({ data, cartItems, handleAddToCart, handleLoadMore, isCheckoutLoading }) {
    return (
        <section className="mt-4">
            <h2 className="visually-hidden">Lamps</h2>
            <div className="row row-gap-4 align-content-stretch">
                {data?.products.map((item) => (
                    <div key={item.id} className="col-6 col-md-4 col-lg-3">
                        <Article
                            item={item}
                            handleAddToCart={handleAddToCart}
                            isInCart={cartItems.some((cartItem) => cartItem.id === item.id)}
                            isCheckoutLoading={isCheckoutLoading}
                        />
                    </div>
                ))}
            </div>
            <div className="text-center mb-5">
                <button className="btn btn-outline-primary btn-lg mt-5" onClick={handleLoadMore}>Load more</button>
            </div>
        </section>
    );
}
