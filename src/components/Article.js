import React from "react";

export default function Article(props) {
    const handleAddToCart = () => {
        props.onAddToCart(props.item);
    };

    return (
        <div className="card h-150" style={{ width: "12rem", height: "100%"}}>
            <img 
                src={`../images/${props.item.coverImg}`} 
                className="card-img-top" 
                alt="Stěnová lampa" 
            />
            <div className="card-body">
                <h5 className="card-title">{props.item.title}</h5>
                <button onClick={handleAddToCart} className="btn btn-primary">Add to cart</button>
            </div>
        </div>
    );
}
