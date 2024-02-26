import React from "react";

export default function Article(props) {
    return (
        <div className="card h-100">
            <img 
                src={`../images/${props.item.coverImg}`} 
                className="card-img-top d-block"
                style={{ height: "100%" }}  
                alt=""
            />
            <div className="card-body">
                <p className="card-title h3">{props.item.title}</p>
                <p className="card-text">Price: €{props.item.price}</p>
                <button 
                    onClick={() => props.handleAddToCart(props.item)} // Kliknutí na tlačítko pro přidání položky do košíku
                    className={`btn btn-outline-primary ${props.isInCart ? "disabled" : ""}`} // Nastavuje tlačítka podle toho, zda je položka již v košíku
                    disabled={props.isInCart || props.orderSent} // Zakáže tlačítko, pokud je položka v košíku nebo je objednávka odeslána
                >
                    {props.isInCart || props.orderSent ? "Added to cart" : "Add to cart"} {/* Text tlačítka podle toho, zda je položka již v košíku a obj.byla odeslána */}
                </button>
            </div>
        </div>
    );
}
