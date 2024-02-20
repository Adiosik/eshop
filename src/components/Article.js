import React, { useState } from "react";

export default function Article(props) {
    const [isInCart, setIsInCart] = useState(false);

    // Funkce pro přidání artiklu do košíku a změnu stavu na true
    const handleAddToCart = () => {
        props.onAddToCart(props.item);
        setIsInCart(true); // Nastaví isInCart na true po přidání artiklu do košíku
    };

    return (
        <div className="card h-100">
            <img 
                src={`../images/${props.item.coverImg}`} 
                className="card-img-top"  
            />
            <div className="card-body">
                <h5 className="card-title">{props.item.title}</h5>
                <p className="card-text">Price: €{props.item.price}</p>
                <button 
                    onClick={handleAddToCart} 
                    className={`btn btn-primary ${isInCart ? "disabled" : ""}`} // Pokud je isInCart true, přidá se "disabled" pro zablokování tlačítka
                    disabled={isInCart} // Pokud je isInCart true, tlačítko bude zakázané
                >
                    {isInCart ? "Added to cart" : "Add to cart"} {/* Pokud je artikl přidán, zobrazí se "Added to cart", jinak "Add to cart" */}
                </button>
            </div>
        </div>
    );
}
