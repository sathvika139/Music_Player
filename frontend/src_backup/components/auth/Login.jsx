import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import validator from "validator";

import Input from "../common/Input";
import "../../css/auth/login.css";

// 🔥 DEMO MODE FLAG
const DEMO_MODE = true;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ DEMO SHORT-CIRCUIT — NOTHING ELSE RUNS
  const handleLogin = (e) => {
    e.preventDefault();

    if (DEMO_MODE) {
      navigate("/"); // homepage route
      return; // ⛔ hard stop
    }

    // --- REAL LOGIN (unchanged, future use) ---
    if (!validator.isEmail(email)) return;

    // original logic can stay here
  };

  return (
    <div className="login-wrapper">
      <h3 className="login-title">Welcome Back</h3>
      <form className="login-form" onSubmit={handleLogin}>
        <Input
          label="Email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 🚫 NO ERROR UI IN DEMO MODE */}

        <button className="login-submit-btn">
          <span>LOGIN</span>
        </button>
      </form>
    </div>
  );
};

export default Login;
