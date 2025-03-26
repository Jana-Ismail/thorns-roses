export const getRetailers = async () => {
    const response = await fetch(`http://localhost:8088/retailers?_expand=distributor`)
    return response.json()
}