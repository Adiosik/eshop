export const calculateDiscountedPrice = (price, discountPercentage) => {
    return Math.floor(price * (1 - discountPercentage / 100));
};