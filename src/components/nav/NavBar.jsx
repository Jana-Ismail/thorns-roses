import { Link } from "react-router-dom"
import './NavBar.css'

export const NavBar = () => {
    return (
    <ul className="navbar">
        <li className="navbar-item">
            <Link to="/nurseries" className="navbar-link">Nurseries</Link>
        </li>
        <li className="navbar-item">
            <Link to="/distributors" className="navbar-link">Distributors</Link>
        </li>
        <li className="navbar-item">
            <Link to="/retailers" className="navbar-link">Retailers</Link>
        </li>
    </ul>
    )
}