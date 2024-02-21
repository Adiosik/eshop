import React from "react";

export default function Article(props) {
    return (
        <div className="card h-100">
            <img 
                src={`../images/${props.item.coverImg}`} 
                className="card-img-top"  
            />
            <div className="card-body">
                <p className="card-title h3">{props.item.title}</p>
                <p className="card-text">Price: €{props.item.price}</p>
                <button 
                    onClick={() => props.handleAddToCart(props.item)}
                    className={`btn btn-outline-primary ${props.isInCart ? "disabled" : ""}`} 
                    disabled={props.isInCart} 
                >
                    {props.isInCart ? "Added to cart" : "Add to cart"}
                </button>
            </div>
        </div>
    );
}
