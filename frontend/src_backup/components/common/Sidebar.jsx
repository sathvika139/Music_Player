import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ onLogout, onProfileClick }) {
  const location = useLocation();

  const menuItems = [
    { path: "/", icon: "fas fa-home", label: "Home" },
    { path: "/search", icon: "fas fa-search", label: "Search" },
    { path: "/favourites", icon: "fas fa-heart", label: "My Favourite" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <i className="fas fa-music"></i>
          <h1>Synthesia</h1>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile" onClick={onProfileClick}>
          <div className="user-avatar">
            <i className="fas fa-user"></i>
          </div>
          <div className="user-info">
            <p className="user-name">
              {JSON.parse(localStorage.getItem("user"))?.name || "Rohit kumar"}
            </p>
          </div>
          <button className="settings-btn">
            <i className="fas fa-cog"></i>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
