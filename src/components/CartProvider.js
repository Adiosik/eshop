import React from "react";
import { calculateDiscountedPrice } from '../utilities';

export const CartContext = React.createContext();

export const CartContextProvider = ({children}) => {
    const [cartItems, setCartItems] = React.useState([]);
    const [cartState, setCartState] = React.useState(undefined);
    const [isLoadingCartData, setIsLoadingCartData] = React.useState(true)

    const getTotalPriceWithDiscount = () => {
        return cartItems.reduce((total, item) => total + calculateDiscountedPrice(item.price, item.discountPercentage) * item.quantity, 0);
    };
    
    React.useEffect(() => {
        fetch('https://dummyjson.com/carts/1')
            .then(res => res.json())
            .then(cartData => {
                setCartItems(cartData.products);
                setIsLoadingCartData(false);
            })
            .catch(error => {
                //setError('Failed to fetch cart data: ' + error);
                setIsLoadingCartData(false);
            });
    }, []);
    
    React.useEffect(() => {
        const cartNotEmpty = cartItems.length
        if (cartNotEmpty) {
            setCartState(undefined);
        }
    }, [cartItems, setCartState]);
    
    const updateCart = (item, quantity) => {
        fetch('https://dummyjson.com/carts/1', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                merge: true, // this will include existing products in the cart
                products: [
                    {
                        id: item.id,
                        quantity: quantity,
                    },
                ],
            }),
        })
    };
    
    const updateCartItemQuantity = (item, newQuantity) => {
        const updatedCart = cartItems.map(cartItem =>
            cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
        );
        setCartItems(updatedCart);
        updateCart(item, newQuantity);
    };
    
    const handleAddToCart = (item) => {
        const existingItem = cartItems.find(existingItem => existingItem.id === item.id);
        if (existingItem) {
            updateCartItemQuantity(item, existingItem.quantity + 1);
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
            updateCart(item, 1);
        }
    };
    
    const handleRemoveFromCart = (item) => {
        const existingItem = cartItems.find(existingItem => existingItem.id === item.id);
        if (existingItem && existingItem.quantity > 1) {
            updateCartItemQuantity(item, existingItem.quantity - 1);
        } else {
            const updatedCart = cartItems.filter(i => i !== item);
            setCartItems(updatedCart);
            updateCart(item, 0);
        }
    };

    const handleRemoveAllFromCart = (item) => {
        const updatedCart = cartItems.filter(cartItem => cartItem.id !== item.id);
        setCartItems(updatedCart);
        updateCart(item, 0);
    };

    const value={
        setCartState,
        setCartItems,
        cartItems,
        cartState,
        getTotalPriceWithDiscount,
        isLoadingCartData,
        handleRemoveFromCart,
        handleAddToCart,
        handleRemoveAllFromCart,
        updateCartItemQuantity,
    };

    return (
        <CartContext.Provider
            value={value}
        >
        {children}
        </CartContext.Provider>
    )
}
