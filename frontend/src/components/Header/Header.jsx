import "./Header.css";
import { NavLink } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";

function Header() {
  return (
    <header className="header">
      {/* Left Section */}
      <div className="header-left">
        {/* Logo */}
        <div className="logo">
          EMS
        </div>

        {/* Navigation */}
        <nav className="nav-menu">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/all-tickets"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            All Tickets
          </NavLink>

          <NavLink
            to="/my-tickets"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            My Tickets
          </NavLink>
        </nav>
      </div>

      {/* Right Section */}
      <div className="header-right">
        {/* Notification */}
        <div className="notification-container">
          <FaBell className="header-icon" />
          <span className="notification-badge">3</span>
        </div>

        {/* Profile */}
        <div className="profile-container">
          <FaUserCircle className="profile-icon" />
          <span className="profile-name">Admin</span>
        </div>
      </div>
    </header>
  );
}

export default Header;