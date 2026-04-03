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
//import Register from "./components/auth/Register";
import Signup from "./components/auth/Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    return !!localStorage.getItem("token");
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  // If not logged in, ONLY show Auth routes (No Sidebar/Logout button)
  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/register"
            element={<Signup setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }

  // If logged in, show the main application layout
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <div className="top-bar">
            <div className="user-profile"></div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>

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

        <div className="player-container">
          <Player />
        </div>
      </div>
    </Router>
  );
}

export default App;
