import React from "react";

export default function Article(props) {
    return (
        <div className="card" style={{ width: "18rem" }}>
            <img 
                src="/images/stenova-lampa.jpg" 
                className="card-img-top" 
                alt="Stěnová lampa" 
            />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <a href="#" className="btn btn-primary">Add to cart</a>
            </div>
        </div>
    );
}
