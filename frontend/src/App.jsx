import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Sidebar from "./components/common/Sidebar";
import Home from "./components/pages/Home";
import Search from "./components/pages/Search";
import Favourites from "./components/pages/Favourites";
import Player from "./components/player/Player";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="app">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="main-content">
          {/* Top Bar with Logout */}
          <div className="top-bar">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="scrollable-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>

        {/* Player Footer */}
        <div className="player-container">
          <Player />
        </div>
      </div>
    </Router>
  );
}

export default App;
