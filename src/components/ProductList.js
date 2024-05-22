import React from "react";
import Product from "./Product";
import { formatCategoryName } from "../utilities";

export default function ProductList({ products, handleLoadMore, isLoadingData, isMaxProductsLoaded, isProductsFound, selectedCategory }) {
    return (
        <div className="col mb-5 mt-4">
            {selectedCategory && (
                <div className="mb-3">
                    <h2 className="h1">{formatCategoryName(selectedCategory)}</h2>
                </div>
            )}
            {isProductsFound ? (
                <>
                    <h2 className="visually-hidden">Products</h2>
                    <div className="row row-gap-4 align-content-stretch">
                        {products.map((item) => (
                            <div key={item.id} className="col-12 col-sm-6 col-lg-4 col-xxl-3">
                                <Product
                                    item={item}
                                />
                            </div>
                        ))}
                    </div>
                    {!isMaxProductsLoaded && (
                        <div className="text-center mt-5">
                            {isLoadingData ? (
                                <div className="alert alert-info" role="alert">
                                    Searching products
                                </div>
                            ) : (
                                <button
                                    className="btn btn-outline-primary btn-lg"
                                    onClick={handleLoadMore}
                                    disabled={isLoadingData}
                                >
                                    Load more
                                </button>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <div className="alert alert-warning" role="alert">
                    No products found.
                </div>
            )}
        </div>
    );
}
