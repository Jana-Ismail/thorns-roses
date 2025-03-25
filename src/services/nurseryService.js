export const getNurseries = async () => {
    const response = await fetch(`http://localhost:8088/nurseries`)
    return response.json()
}

export const getNurseryFlowers = async (nurseryId) => {
    const response = await fetch(`http://localhost:8088/nurseryFlowers?nurseryId=${nurseryId}&_expand=flower`)
    return response.json()
}

export const getNurseryDistributors = async (nurseryId) => {
    const response = await fetch(`http://localhost:8088/nurseryDistributors?nurseryId=${nurseryId}&_expand=distributor`)
    return response.json()
}