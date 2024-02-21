import React from "react"
import data from "./data"
import Cart from "./components/Cart"
import ArticleList from "./components/ArticleList"
import EmailInput from "./components/EmailInput"

export default function App() {
    const [cartItems, setCartItems] = React.useState([])
    const [showEmailInput, setShowEmailInput] = React.useState(false)

    // Přidá konkrétní položky do košíku
    const handleAddToCart = (item) => {
        setCartItems(cartItems.concat(item))
    }

    // Odstraní položku z košíku
    const handleRemoveFromCart = (itemToRemove) => {
        const updatedCart = cartItems.filter(item => item !== itemToRemove) // Vytvoří se nové pole bez odstraněné položky
        setCartItems(updatedCart) // Aktualizuje stav košíku
    }

    // Zobrazí formulář pro e-mail
    const handleCheckout = () => {
        setShowEmailInput(true)
    }

    return (
        <main>
            <div className="container mt-5">
                <p className="h1">E-shop</p>
                <div className="row align-items-center">
                    <div className="col mt-4">
                        <Cart 
                            cartItems={cartItems} // Zobrazení košíku
                            handleRemoveFromCart={handleRemoveFromCart} // Odstraní položku z košíku
                            handleCheckout={handleCheckout} // Přejít do Pokladny
                        />
                        {showEmailInput && 
                            // Zobrazí se pouze tehdy, když je showEmailInput true
                            <EmailInput 
                                showEmailInput={showEmailInput} // Předává prop showEmailInput komponentě EmailInput
                                setShowEmailInput={setShowEmailInput} // Aktualizuje email
                            />
                        }
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <ArticleList 
                    data={data} 
                    cartItems={cartItems}
                    handleAddToCart={handleAddToCart}
                />
            </div>
        </main>
    )
}
