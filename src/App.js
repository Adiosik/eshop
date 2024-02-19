import React from "react"
import data from "./data"
import Cart from "./components/Cart"
import CartItem from "./components/CartItem"
import ArticleList from "./components/ArticleList"
import Article from "./components/Article"
import EmailInput from "./components/EmailInput"

export default function App() {
    return (
        <main>
           <h1 className="title">E-shop</h1>
           <Cart />
           <ArticleList />
        </main>
    )
}
