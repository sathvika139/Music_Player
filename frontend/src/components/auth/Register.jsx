import React, { useState } from "react";
import axios from "axios";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import "../../css/auth/Register.css";

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  // Use local state to avoid Redux dispatch errors
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setLocalError] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [base64Image, setBase64Image] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImage(reader.result);
      setBase64Image(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    setIsLoading(true);
    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
    try {
      const res = await axios.post(`${baseUrl}/api/auth/signup`, {
        name: fullName,
        email,
        password,
        avatar: base64Image,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setIsAuthenticated(true); // Updates App.jsx state
        navigate("/home");
      }
    } catch (err) {
      setLocalError(err.response?.data?.message || "Signup Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <h3 className="signup-title">Create an Account</h3>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="profile-image-container">
          {previewImage ? (
            <img src={previewImage} alt="avatar" className="profile-image" />
          ) : (
            <div className="profile-placeholder">
              <CiUser size={40} />
            </div>
          )}
          <label className="image-upload-icon">
            +
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>
        </div>

        <Input
          label="Name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <div className="error-message" style={{ color: "red" }}>
            {error}
          </div>
        )}

        <button
          className="signup-btn-submit"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Signing Up..." : "Signup"}
        </button>

        <p className="auth-switch-link" onClick={() => navigate("/login")}>
          Already have an account? Login
        </p>
      </form>
    </div>
  );
};

export default Signup;
