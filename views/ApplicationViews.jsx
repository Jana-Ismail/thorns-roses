import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../src/components/nav/NavBar"
import { NurseryList } from "../src/components/nurseries/NurseryList"
import { DistributorList } from "../src/components/distributors/DistributorList"
import { RetailerList } from "../src/components/retailers/RetailerList"
import { useEffect, useState } from "react"

export const ApplicationViews = () => {
    const [currentCustomer, setCurrentCustomer] = useState({})

    useEffect(() => {
        const localFlowerCustomer = localStorage.getItem("flower_user")
        const flowerCustomerObject = JSON.parse(localFlowerCustomer)

        setCurrentCustomer(flowerCustomerObject)
    }, [])

    return (
        <Routes>
            <Route 
                path="/"
                element={
                    <>
                        <NavBar />
                        <Outlet />
                    </>
                }
            >
                <Route path="nurseries" element={ <NurseryList /> } />
                <Route path="distributors" element={ <DistributorList /> } />
                <Route path="retailers" element={ <RetailerList currentCustomer={currentCustomer} /> } />
                <Route path="cart" element={ <>Cart Items Here</> } />
            </Route>
        </Routes>
    )
}