export const getNurseryFlowersByNurseryId = async (nurseryId) => {
    const response = await fetch(`http://localhost:8088/nurseryFlowers?nurseryId=${nurseryId}&_expand=flower`)
    return response.json()
}

export const getAllNurseryFlowers = async () => {
    const response = await fetch(`http://localhost:8088/nurseryFlowers?_expand=flower&_expand=nursery`)
    return response.json()
}
