import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Auth.css"
import { createCustomer, getCustomerByEmail } from "../../services/customerServices"

export const Register = (props) => {
  const [customer, setCustomer] = useState({
    email: "",
    name: "",
    businessName: "",
    password: ""
  })
  let navigate = useNavigate()

  const registerNewCustomer = async () => {
    const createdCustomer = await createCustomer(customer)
      if (createdCustomer.hasOwnProperty("id")) {
        localStorage.setItem(
          "flower_user",
          JSON.stringify({
            id: createdCustomer.id,
          })
        )
    }
    
    navigate("/")
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    
    const foundCustomer = getCustomerByEmail(customer.email)
    
      if (foundCustomer.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewCustomer()
      }
  }

  const updateCustomer = (evt) => {
    const copy = { ...customer }
    copy[evt.target.id] = evt.target.value
    setCustomer(copy)
  }

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h1>Thorns And Roses Flower Hub</h1>
        <h2>Please Register</h2>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="businessName"
              className="form-control"
              placeholder="Enter your wedding business name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <button className="login-btn btn-info" type="submit">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  )
}
