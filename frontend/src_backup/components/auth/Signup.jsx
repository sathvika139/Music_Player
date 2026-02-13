import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

import Input from "../common/Input";

import {
  setLoading,
  setUser,
  setError,
  clearError,
} from "../../redux/slices/authSlice";

import { closeAuthModal, openAuthModal } from "../../redux/slices/uiSlice";

import "../../css/auth/Signup.css";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    dispatch(clearError());

    if (!fullName || !email || !password) {
      dispatch(setError("All fields are required"));
      return;
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/signup`,
        {
          name: fullName,
          email,
          password,
          avatar: base64Image,
        },
      );

      const data = res.data || {};

      dispatch(
        setUser({
          user: data.user,
          token: data.token,
        }),
      );

      localStorage.setItem("token", data.token);

      dispatch(closeAuthModal());
      navigate("/home");

      console.log("Signup Successful");
      console.table(data.user);
    } catch (err) {
      dispatch(
        setError(
          err.response?.data?.message || "Signup Failed. Please try again",
        ),
      );
    }
  };

  return (
    <div className="signup-wrapper">
      <h3 className="signup-title">Create an Account</h3>
      <p className="signup-subtitle">Join us today by entering your details</p>

      <form className="signup-form" onSubmit={handleSubmit}>
        {/* Avatar */}
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
          placeholder="Enter your name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <Input
          label="Email"
          type="email"
          placeholder="Enter your Email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="signup-error">{error}</div>}

        <div className="signup-actions">
          <button
            className="signup-btn-submit"
            type="submit"
            disabled={isLoading}
          >
            <span>{isLoading ? "Signing Up..." : "Signup"}</span>
          </button>
        </div>

        {/* Switch to Login */}
        <p
          className="auth-switch-link"
          onClick={() => {
            dispatch(clearError());
            dispatch(openAuthModal("login"));
          }}
        >
          Already have an account?
        </p>
      </form>
    </div>
  );
};

export default Signup;
