export const getPriceQueryParams = (searchParams, key, value) => {
    const hasValueInParam = searchParams.has(key);

    if (value && hasValueInParam) {
        searchParams.set(key, value);
    }
    else if (value) {
        searchParams.append(key, value);
    }
    else if (hasValueInParam) {
        searchParams.delete(key);
    }

    return searchParams;
};

export const calculateOrderCost = (cartItems) => {
    const itemsPrice = cartItems?.reduce(
        (acc, cur) => acc + cur?.price * cur?.quantity, 0
    )

    const shippingPrice = itemsPrice > 200 ? 0 : 25;
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2))
    const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2))

    return {
        itemsPrice: Number(itemsPrice).toFixed(2),
        shippingPrice,
        taxPrice,
        totalPrice
    }
}