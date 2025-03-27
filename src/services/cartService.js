export const addCartItem = async (cartItem) => {
    return await fetch(
        `http://localhost:8088/cart`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cartItem)
        }
    )
}