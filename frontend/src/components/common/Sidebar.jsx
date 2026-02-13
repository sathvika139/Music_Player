import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/", icon: "fas fa-home", label: "Home" },
    { path: "/search", icon: "fas fa-search", label: "Search" },
    { path: "/favourites", icon: "far fa-heart", label: "My Favourite" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>Synthesia</h1>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
