

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./side-nav.css";
import logo from "../../../logo.png";

const SideNav: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the session or any user data stored locally
    localStorage.removeItem("userToken"); // Example, adjust according to your setup
    sessionStorage.removeItem("userToken");

    // Redirect to the login page after logout
    navigate("/login");
  };

  return (
    <aside className="side-nav">
      <nav>
        <img src={logo} alt="Lemery SHS Logo"></img>
        <ul>
          <li id="dashboard">
            <NavLink
              to="/dashboard"
              end // This ensures the link is only active when exactly on /dashboard
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/urls"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              URLs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/ports"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Ports
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/logs"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Logs
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Users
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={handleLogout}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideNav;
