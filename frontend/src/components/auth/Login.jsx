import React, { useState } from "react";
import "./Login.css";

// Destructure setIsAuthenticated from props
const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 1. Store the token
        localStorage.setItem("token", data.token);
        // 2. Update App state (This triggers the switch to Home in App.jsx)
        setIsAuthenticated(true);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Connection error. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-logo">
            <div className="login-logo-icon">🎵</div>
            <div className="login-logo-text">Synthesia</div>
          </div>

          <div className="login-welcome">
            <h1>Welcome Back</h1>
            <p>Sign in to your account</p>
          </div>

          {error && <div className="error-message">⚠️ {error}</div>}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Signing in..." : "LOGIN"}
            </button>
          </form>

          <div className="signup-link">
            Don't have an account? <a href="/register">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
