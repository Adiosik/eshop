import React from "react";

export default function Article() {
    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src="http://satyr.io/100/1" className="card-img-top" alt="image 1" />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    );
}
