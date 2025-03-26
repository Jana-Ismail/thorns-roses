export const getNurseryDistributors = async (nurseryId) => {
    const response = await fetch(`http://localhost:8088/nurseryDistributors?nurseryId=${nurseryId}&_expand=distributor`)
    return response.json()
}

export const getNurseryDistributorsByDistributorId = async (distributorId) => {
    const response = await fetch(`http://localhost:8088/nurseryDistributors?distributorId=${distributorId}&_expand=nursery`)
    return response.json()
}