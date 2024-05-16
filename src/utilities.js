export const calculateDiscountedPrice = (price, discountPercentage) => {
    return Math.floor(price * (1 - discountPercentage / 100));
}

export const isCheckoutLoading = (cartState) => {
    return cartState === "isLoading";
}

export const findProductInCart = (cartItems, productId) => {
    return cartItems.find((cartItem) => cartItem.id === productId);
}

export const calculateTotalPriceForItem = (price, quantity) => {
    return price * quantity;
}

export const debounceCallback = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(...args);
      }, wait);
    };
}

export const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
};
