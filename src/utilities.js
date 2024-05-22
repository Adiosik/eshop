export const calculateDiscountedPrice = (price, discountPercentage) => {
    return Math.floor(price * (1 - discountPercentage / 100));
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

export const formatCategoryName = (name) => {
  return name
    .replace("mens", "men’s")
    .replace("-", " ")
    .replace(/^\w/, (c) => c.toUpperCase());
};
