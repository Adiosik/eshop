import { createContext, useState, useEffect } from "react";
import { getDiscountedPrice } from '../utilities';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartState, setCartState] = useState(undefined);
    const [isLoadingCartData, setIsLoadingCartData] = useState(true)
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
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

    useEffect(() => {
        const cartNotEmpty = cartItems.length
        if (cartNotEmpty) {
            setCartState(undefined);
        }
    }, [cartItems, setCartState]);

    useEffect(() => {
        const count = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartItemCount(count);
    }, [cartItems]);

    const updateCartItemCount = () => {
        const count = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartItemCount(count);
    };

    const getTotalPriceWithDiscount = () => {
        return cartItems.reduce((total, item) => total + getDiscountedPrice(item.price, item.discountPercentage) * item.quantity, 0);
    };

    const getTotalRegularPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const getTotalSavings = () => {
        return getTotalRegularPrice() - getTotalPriceWithDiscount();
    };

    useEffect(() => {
        fetch('https://dummyjson.com/carts/1', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                merge: false,
                products: cartItems.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                })),
            }),
        });
    }, [cartItems])
    
    const clearCartState = () => {
        setCartState(undefined);
    }

    const resetCartItems = () => {
        setCartItems([]);
    }

    const updateCartProductQuantity = (item, newQuantity) => {
        const updatedCart = cartItems.map(cartItem =>
            cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
        );
        setCartItems(updatedCart);
        updateCartItemCount();
    };

    const addToCart = (item) => {
        const existingItem = cartItems.find(existingItem => existingItem.id === item.id);
        if (existingItem) {
            updateCartProductQuantity(item, existingItem.quantity + 1);
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
            updateCartItemCount();
        }
    };

    const removeFromCart = (item) => {
        const existingItem = cartItems.find(existingItem => existingItem.id === item.id);
        if (existingItem && existingItem.quantity > 1) {
            updateCartProductQuantity(item, existingItem.quantity - 1);
        } else {
            const updatedCart = cartItems.filter(i => i !== item);
            setCartItems(updatedCart);
            updateCartItemCount();
        }
    };    

    const removeAllFromCart = (item) => {
        const updatedCart = cartItems.filter(cartItem => cartItem.id !== item.id);
        setCartItems(updatedCart);
        updateCartItemCount();
    };

    const isCheckoutLoading = (cartState) => {
        return cartState === "isLoading";
    };

    const findProductInCart = (cartItems, productId) => {
        return cartItems.find((cartItem) => cartItem.id === productId);
    };

    const value = {
        clearCartState,
        resetCartItems,
        setCartState,
        setCartItems,
        cartItems,
        cartState,
        cartItemCount,
        getTotalPriceWithDiscount,
        getTotalRegularPrice,
        getTotalSavings,
        isLoadingCartData,
        isCheckoutLoading,
        findProductInCart,
        removeFromCart,
        addToCart,
        removeAllFromCart,
        updateCartProductQuantity,
    };

    return (
        <CartContext.Provider
            value={value}
        >
            {children}
        </CartContext.Provider>
    )
}
