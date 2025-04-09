import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../src/components/nav/NavBar"
import { NurseryList } from "../src/components/nurseries/NurseryList"
import { DistributorList } from "../src/components/distributors/DistributorList"
import { RetailerList } from "../src/components/retailers/RetailerList"
import { useEffect, useState } from "react"
import { CartList } from "../src/components/cart/CartList"
import { getCartItemsByCustomerId } from "../src/services/cartService"

export const ApplicationViews = () => {
    const [currentCustomer, setCurrentCustomer] = useState({})
    const [cartItemsCount, setCartItemsCount] = useState(0)

    const getAndSetCartItemsCount = async () => {
        const cartItemsData = await getCartItemsByCustomerId(currentCustomer.id)
        const cartItemsNum = cartItemsData.length
        setCartItemsCount(cartItemsNum)
    }

    useEffect(() => {
        const localFlowerCustomer = localStorage.getItem("flower_user")
        const flowerCustomerObject = JSON.parse(localFlowerCustomer)

        setCurrentCustomer(flowerCustomerObject)
    }, [])

    useEffect(() => {
        getAndSetCartItemsCount()
    }, [currentCustomer])

    return (
        <Routes>
            <Route 
                path="/"
                element={
                    <>
                        <NavBar cartItemsCount={cartItemsCount} />
                        <Outlet />
                    </>
                }
            >
                <Route path="nurseries" element={ <NurseryList /> } />
                <Route path="distributors" element={ <DistributorList /> } />
                <Route path="retailers" element={ 
                        <RetailerList 
                            currentCustomer={currentCustomer}
                            cartItemsCount={cartItemsCount} 
                            setCartItemsCount={setCartItemsCount} 
                        /> 
                    } 
                />
                <Route path="cart" element={ 
                    < CartList 
                        currentCustomer={currentCustomer} 
                        setCartItemsCount={setCartItemsCount}
                    /> } 
                />
            </Route>
        </Routes>
    )
}