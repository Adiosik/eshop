import React from "react";

export default function Article(props) {
    return (
        <div className="card h-150" style={{ width: "12rem", height: "100%"}}>
            <img 
                src={`../images/${props.item.coverImg}`} 
                className="card-img-top" 
                alt="Stěnová lampa" 
            />
            <div className="card-body">
                <h5 className="card-title">{props.item.title}</h5>
                <a href="#" className="btn btn-primary">Add to cart</a>
            </div>
        </div>
    );
}
