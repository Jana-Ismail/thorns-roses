export const getDistributors = async () => {
    const response = await fetch(`http://localhost:8088/distributors?_embed=nurseryDistributors&_embed=retailers`)
    return response.json()
}