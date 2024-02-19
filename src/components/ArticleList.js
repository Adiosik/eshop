import React from "react";
import Article from "./Article";
import data from "../data";

export default function ArticleList() {
    const cards = data.map(item => {
        return (
            <Article
                key={item.id}
                item={item}
            />
        )
    })

    return (
        <div className="article-list">
            {cards}
        </div>
    )
}
