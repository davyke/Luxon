
import img from "../assets/vite.svg"
import "../App.css"
const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="logo">
            <img src={img} alt="openreplay" />
            <h1>1:2:4</h1>
        </div>
        <div className="link_elements">
            <ul>
                <li>Home</li>
                <li>Team</li>
                <li>About us</li>
                <li>Pricing</li>
            </ul>
        </div>
        <div className="user">
            <p>login</p>
            <div className="divider"></div>
            <p>signup</p>

        </div>
    </nav>
  )
}

export default Navbar