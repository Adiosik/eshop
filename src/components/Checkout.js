import React from "react";

export default function Checkout() {
    

    return (
        <form>
            <div class="my-4">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="example@example.com" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <button type="submit" id="submitBtn" className="btn btn-primary btn-lg">Place order</button>
        </form>
    )
}
