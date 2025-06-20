import { NavLink, useNavigate } from "react-router-dom";//ok
import { isAuthenticated } from "../utils/auth";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <NavLink to="/dashboard" className="nav-link">DashBoard</NavLink>
        <NavLink to="/inventory" className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>Inventory</NavLink>
        <NavLink to="/services" className="nav-link">Services</NavLink>
        <NavLink to="/profit" className="nav-link">Profit</NavLink>
        <NavLink to="/dealers" className="nav-link">Dealers</NavLink>
        <NavLink to="/sales" className="nav-link">Sales</NavLink>
      </div>
      <div className="nav-right">
        {loggedIn ? (
          <button onClick={handleLogout} className="nav-btn">Logout</button>
        ) : (
          <>
            <NavLink to="/login" className="nav-btn">Login</NavLink>
            <NavLink to="/signup" className="nav-btn">Signup</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
