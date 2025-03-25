import { useEffect, useState } from "react"
import './Nurseries.css'
import { getNurseries } from "../../services/nurseryService"
import { Nursery } from "./Nursery"

export const NurseryList = () => {
    const [nurseries, setNurseries] = useState([])

    const getAndSetNurseries = async () => {
        const nurseriesArr = await getNurseries()
        setNurseries(nurseriesArr)
    }

    useEffect(() => {
        getAndSetNurseries()
    }, [])

    return (
        <div className="nurseries-container">
            <h2 className="nurseries-header">Nurseries</h2>
            <article className="nurseries">
                {nurseries.map(nursery => (
                    <Nursery nursery={nursery} key={nursery.id} />
                ))}
            </article>
        </div>
    )
}