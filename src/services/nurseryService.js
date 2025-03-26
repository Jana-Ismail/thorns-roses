export const getNurseries = async () => {
    const response = await fetch(`http://localhost:8088/nurseries`)
    return response.json()
}