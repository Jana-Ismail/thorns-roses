import { useEffect, useState } from "react"
import { getNurseryDistributorsByDistributorId } from "../../services/nurseryDistributorService"
import { getNurseryFlowersByNurseryId } from "../../services/nurseryFlowerService"

export const Distributor = ( { distributor } ) => {
    const [nurseryDistributors, setNurseryDistributors] = useState([])
    const [distributorFlowers, setDistributorFlowers] = useState([])

    const getAndSetNurseryDistributors = async () => {
        const nurseryDistributorsData = await getNurseryDistributorsByDistributorId(distributor.id)
        setNurseryDistributors(nurseryDistributorsData)
    }

    const getAndSetDistributorFlowers = async () => {
        const flowersPromises = nurseryDistributors.map(nurseryDistributor => {
            return getNurseryFlowersByNurseryId(nurseryDistributor.nursery.id)
        })
        
        const resolvedFlowersArrays = await Promise.all(flowersPromises)

        const allFlowers = resolvedFlowersArrays.flat().map(flower => {
            return {
                ...flower,
                distributorPrice: parseFloat(parseFloat(flower.price) + (parseFloat(flower.price) * parseFloat(distributor.markupPercentage))).toFixed(2)
            }
        })

        setDistributorFlowers(allFlowers)
    }

    useEffect(() => {
        getAndSetNurseryDistributors()
    }, [distributor])

    useEffect(() => {
        if (nurseryDistributors.length > 0) {
            getAndSetDistributorFlowers()
        }
    }, [nurseryDistributors])

    return (
        <section className="distributor">
            <h3 className="distributor-name">{distributor.businessName}</h3>
            <ul className="distributor-flowers-list">
                {distributorFlowers.map(distributorFlower => (
                    <li className="distributor-flowers-list-item" key={distributorFlower.id}>
                        {distributorFlower.flower.color} | {distributorFlower.flower.species} ${distributorFlower.distributorPrice}
                    </li>
                ))}
            </ul>
            <h3 className="retailers-list-header">Retailers</h3>
            <ul className="distributor-retailers-list">
                {distributor.retailers.map(retailer => (
                    <li className="distributor-retailers-list-item" key={retailer.id}>
                        {retailer.businessName}
                    </li>
                ))}
            </ul>
        </section>
    )

}


// Another way to get all the distributor flowers

    // const getAndSetDistributorFlowers = async () => {
    //     // Create an empty array to hold all our flowers
    //     let allFlowers = []
        
    //     // Loop through each nursery distributor one by one
    //     for (const nurseryDistributor of nurseryDistributors) {
    //         // Get flowers for this specific nursery
    //         const nurseryFlowers = await getNurseryFlowersByNurseryId(nurseryDistributor.nursery.id)
            
    //         // Process each flower to add the distributor price
    //         for (const flower of nurseryFlowers) {
    //             // Calculate base price
    //             const basePrice = parseFloat(flower.price)
                
    //             // Calculate markup amount
    //             const markupRate = parseFloat(distributor.markupPercentage) / 100
    //             const markupAmount = basePrice * markupRate
                
    //             // Calculate final price
    //             const finalPrice = basePrice + markupAmount
                
    //             // Create a new flower object with the distributor price
    //             const flowerWithPrice = {
    //                 ...flower,
    //                 distributorPrice: finalPrice
    //             }
                
    //             // Add this flower to our collection
    //             allFlowers.push(flowerWithPrice)
    //         }
    //     }
        
    //     // Update state with all the flowers we found
    //     setDistributorFlowers(allFlowers)
    // }