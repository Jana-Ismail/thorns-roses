import { useEffect, useState } from "react"
import { getDistributors } from "../../services/distributorService"
import { Distributor } from "./Distributor"
import { getAllNurseryFlowers } from "../../services/nurseryFlowerService"

export const DistributorList = () => {
    const [distributors, setDistributors] = useState([])
    // const [nurseryFlowers, setNurseryFlowers] = useState([])
    
    // const getAndSetNurseryFlowers = async () => {
    //     const nurseryFlowersData = await getAllNurseryFlowers()
    //     setNurseryFlowers(nurseryFlowersData)
    // }

    const getAndSetDistributors = async () => {
        const distributorsData = await getDistributors()
        setDistributors(distributorsData)
    }

    useEffect(() => {
        getAndSetDistributors()
        // getAndSetNurseryFlowers()
    }, [])

    return (
        <div className="distributors-container">
            <h2 className="distributors-header">Distributors</h2>
            <article className="distributors-list">
                {distributors.map(distributor => (
                    <Distributor distributor={distributor} key={distributor.id} />
                ))}
            </article>
        </div>
    )
}