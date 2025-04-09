export const addCartItem = async (cartItem) => {
    return await fetch(
        `http://localhost:8088/cartItems`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cartItem)
        }
    )
}

export const getCartItemsByCustomerId = async (customerId) => {
    const response = await fetch(`http://localhost:8088/cartItems?customerId=${customerId}&_expand=flower`)
    return await response.json()
}

export const deleteCartItem = async (cartItemId) => {
    return await fetch(
        `http://localhost:8088/cartItems/${cartItemId}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}