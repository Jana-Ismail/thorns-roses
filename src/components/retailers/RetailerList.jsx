import { useEffect } from "react"
import { useState } from "react"
import { getRetailers } from "../../services/retailerService"
import { Retailer } from "./Retailer"
import './Retailers.css'

export const RetailerList = ( { currentCustomer } ) => {
    const [retailers, setRetailers] = useState([])

    const getAndSetRetailers = async () => {
        const retailersArr = await getRetailers()
        setRetailers(retailersArr)
    }

    useEffect(() => {
        getAndSetRetailers()
    }, [])

    return (
        <div className="retailers-container">
            <h2 className="retailers-header">Retailers</h2>
            <article className="retailers-list">
                {retailers.map(retailer => (
                    <Retailer 
                        key={retailer.id} 
                        retailer={retailer} 
                        currentCustomer={currentCustomer}
                    />
                ))}
            </article>
        </div>
    )
}