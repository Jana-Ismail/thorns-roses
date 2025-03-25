import { useEffect, useState } from "react"
import { getNurseryDistributors, getNurseryFlowers } from "../../services/nurseryService"

export const Nursery = ( { nursery } ) => {
    const [nurseryFlowers, setNurseryFlowers] = useState([])
    const [nurseryDistributors, setNurseryDistributors] = useState([])

    const getAndSetNurseryFlowers = async () => {
        const nurseryFlowersArr = await getNurseryFlowers(nursery.id)
        setNurseryFlowers(nurseryFlowersArr)
    }

    const getAndSetNurseryDistributors = async () => {
        const nurseryDistributorsArr = await getNurseryDistributors(nursery.id)
        setNurseryDistributors(nurseryDistributorsArr)
    }

    useEffect(() => {
        getAndSetNurseryFlowers()
        getAndSetNurseryDistributors()
    }, [nursery])

    return (
        <section className="nursery">
            <h3 className="nursery-info">{nursery.businessName}</h3>
            <div className="nursery-flowers-container">
                <h3>Flowers</h3>
                <ul className="nursery-flowers">
                    {nurseryFlowers.map(nurseryFlower => (
                        <li className="flower-info" key={nurseryFlower.id}>
                            <div>{nurseryFlower.flower.color} | {nurseryFlower.flower.species} ${nurseryFlower.price}</div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="distributors-list">
                <h3>Distributors</h3>
                <ul className="nursery-distributors">
                    {nurseryDistributors.map(nurseryDistributor => (
                        <li className="distributor-info" key={nurseryDistributor.id}>
                            <div>{nurseryDistributor.distributor.businessName}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}