import { useEffect, useState } from "react"
import { getNurseryDistributorsByDistributorId } from "../../services/nurseryDistributorService"
import { getNurseryFlowersByNurseryId } from "../../services/nurseryFlowerService"

export const Retailer = ( { retailer } ) => {
    const [nurseryDistributors, setNurseryDistributors] = useState([])
    const [retailerFlowers, setRetailerFlowers] = useState([])

    const getAndSetNurseryDistributors = async () => {
        const nurseryDistributorsData = await getNurseryDistributorsByDistributorId(retailer.distributorId)
        setNurseryDistributors(nurseryDistributorsData)
    }

    const getAndSetRetailerFlowers = async () => {
        const flowersPromises = nurseryDistributors.map(nurseryDistributor => {
            return getNurseryFlowersByNurseryId(nurseryDistributor.nursery.id)
        })

        const resolvedFlowersArrays = await Promise.all(flowersPromises)

        const allFlowers = resolvedFlowersArrays.flat().map(flower => {
            const distributorPrice = parseFloat(parseFloat(flower.price) + (parseFloat(flower.price) * parseFloat(retailer.distributor.markupPercentage))).toFixed(2)
            const retailerPrice = parseFloat(parseFloat(distributorPrice) + (parseFloat(distributorPrice) * parseFloat(retailer.markupPercentage))).toFixed(2)
            return {
                ...flower,
                retailerPrice:  parseFloat(retailerPrice)
            }
        })

        setRetailerFlowers(allFlowers)
    }

    useEffect(() => {
        getAndSetNurseryDistributors()
    }, [retailer])

    useEffect(() => {
        if (nurseryDistributors.length > 0 && retailer.distributor) {
            getAndSetRetailerFlowers()
        }
    }, [nurseryDistributors, retailer])

    return (
        <section className="retailer">
            <h3 className="retailer-name">{retailer.businessName}</h3>
            <div className="retailer-address">{retailer.address}</div>
            <h3 className="retailer-flowers-header">Flowers</h3>
            <ul className="retailer-flowers-list">
                {retailerFlowers.map(retailerFlower => (
                    <li className="retailer-flowers-list-item" key={retailerFlower.id}>
                        {retailerFlower.flower.color} | {retailerFlower.flower.species} ${retailerFlower.retailerPrice}
                    </li>
                ))}
            </ul>
            <div className="retailer-distributor-name">Distributor : <span>{retailer.distributor.businessName}</span></div>
            <div className="retailer-nurseries-header">Nurseries</div>
            <ul className="retailer-nurseries-list">
                {nurseryDistributors.map(nurseryDistributor => (
                    <li className="retailer-nurseries-list-item" key={nurseryDistributor.id}>{nurseryDistributor.nursery.businessName}</li>
                ))}
            </ul>
        </section>
    )
}