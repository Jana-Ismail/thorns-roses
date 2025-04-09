import { useEffect, useState } from 'react'
import './Cart.css'
import { deleteCartItem, getCartItemsByCustomerId } from '../../services/cartService'

export const CartList = ( { currentCustomer } ) => {
    const [cartItems, setCartItems] = useState([])
    const [cartItemsByFlower, setCartItemsByFlower] = useState({})
    const [cartPriceTotal, setCartPriceTotal] = useState(0)

    const getAndSetCartItems = async () => {
        if (currentCustomer.id) {
            const cartItemsData = await getCartItemsByCustomerId(currentCustomer.id)
            setCartItems(cartItemsData)
        }
    }

    const filterCartItems = () => {
        const cartByFlowerType = {}

        cartItems.forEach(item => {
            if (item.flower) {
                const species = item.flower.species
                const color = item.flower.color
                const uniqueFlower = `${color} ${species}`
                if (cartByFlowerType.hasOwnProperty(uniqueFlower)) {
                    cartByFlowerType[uniqueFlower].push(item)
                } else {
                    cartByFlowerType[uniqueFlower] = [item]
                }
            }
        })
        
        setCartItemsByFlower(cartByFlowerType)
    }
    
    const calculateTotalCost = ( { setCartItemsCount } ) => {
        let total = 0
        if (cartItems.length > 0) {
            cartItems.forEach(item => {
                total += item.retailerFlowerPrice
            })
        }
        const usdTotal = total.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
        setCartPriceTotal(usdTotal)
    }

    useEffect(() => {
        getAndSetCartItems()
    }, [currentCustomer])

    useEffect(() => {
        if (cartItems.length > 0) {
            filterCartItems()
            calculateTotalCost()
        }
    }, [cartItems])

    const handlePurchase = async () => {
        const cartItemsPromises = cartItems.map(item => {
            return deleteCartItem(item.id)
        })

    await Promise.all(cartItemsPromises)
    }

    return (
        <div className="cart-container">
            <h2 className="cart-header">Cart</h2>
            <table>
                <thead>
                    <tr>
                        <th>Flower</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(cartItemsByFlower).map(([flowerName, flowerItems]) => {
                        const quantity = flowerItems.length

                        let totalFlowerCost = 0

                        flowerItems.forEach(item => {
                            totalFlowerCost += item?.retailerFlowerPrice || 0
                        })

                        const formattedCost = totalFlowerCost.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD'
                        })

                        return (
                            <tr key={flowerName}>
                                <td>{flowerName}</td>
                                <td>{quantity}</td>
                                <td>{formattedCost}</td>
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr className="total-cost-row">
                        <td></td>
                        <td>Total Cost</td>
                        <td>{cartPriceTotal}</td>
                    </tr>
                </tfoot>
            </table>
            <div className="btn-container">
                <button 
                    className="purchase-btn"
                    onClick={handlePurchase}
                >
                    Purchase Flowers
                </button>
            </div>
        </div>
    )
}