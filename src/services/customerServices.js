export const getCustomerByEmail = async (email) => {
    const response = await fetch(`http://localhost:8088/customers?email=${email}`)
      
    return response.json()
  }
  
  export const createCustomer = async (customer) => {
    return await fetch(`http://localhost:8088/customers`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
  }