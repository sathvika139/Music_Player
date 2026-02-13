import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/reset-password/${token}`,
        { password },
      );

      setMessage(res.data.message || "Password reset successful");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset link invalid or expired");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "black",
      }}
    >
      <form
        onSubmit={handleReset}
        style={{
          width: "380px",
          padding: "30px",
          borderRadius: "20px",
          background: "linear-gradient(145deg, #8b5cf6, #ec4899)",
        }}
      >
        <h2 style={{ color: "white", marginBottom: "16px" }}>Reset Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            marginBottom: "12px",
          }}
        />

        {error && (
          <div style={{ color: "#fecaca", fontSize: "14px" }}>{error}</div>
        )}

        {message && (
          <div style={{ color: "#bbf7d0", fontSize: "14px" }}>{message}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "16px",
            width: "100%",
            padding: "12px",
            borderRadius: "20px",
            border: "none",
            background: "#111",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading ? "Resetting..." : "RESET PASSWORD"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
