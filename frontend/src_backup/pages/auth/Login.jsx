import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    localStorage.setItem("token", "dummy-token");
    navigate("/home");
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "black",
      }}
    >
      <div
        style={{
          width: "380px",
          padding: "30px",
          borderRadius: "32px",
          background: "linear-gradient(145deg, #8b5cf6, #ec4899)",
          boxShadow: "6px 6px 12px #5b21b6, -6px -6px 12px #f472b6",
        }}
      >
        <h2 style={{ color: "white", fontSize: "26px", marginBottom: "6px" }}>
          Welcome Back
        </h2>

        <p style={{ color: "#f3e8ff", marginBottom: "20px", fontSize: "14px" }}>
          Please enter your details to login
        </p>

        <input
          type="email"
          placeholder="sk@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "14px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
          }}
        />

        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
          }}
        />

        <div
          style={{
            textAlign: "right",
            fontSize: "13px",
            color: "#fde7ff",
            cursor: "pointer",
            marginBottom: "16px",
          }}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot password?
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "20px",
            border: "none",
            color: "white",
            fontWeight: "bold",
            background: "linear-gradient(to right, #7c3aed, #db2777)",
            cursor: "pointer",
          }}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}
