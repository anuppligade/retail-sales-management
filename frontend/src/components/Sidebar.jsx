import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiBarChart2 } from "react-icons/fi"; // Icons
import "../styles/sidebar.css";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">

      <h4 className="sidebar-title text-black">Retail App</h4>

      <ul className="sidebar-menu">

        <li className={isActive("/") ? "active" : ""}>
          <Link to="/">
            <FiHome className="menu-icon" /> Dashboard
          </Link>
        </li>

        <li className={isActive("/sales") ? "active" : ""}>
          <Link to="/sales">
            <FiBarChart2 className="menu-icon" /> Sales Management
          </Link>
        </li>

      </ul>

    </div>
  );
}
