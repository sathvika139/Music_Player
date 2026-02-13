import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = () => {
    if (!email) {
      alert("Enter email");
      return;
    }

    alert("Reset link sent to " + email);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white">
      <h2 className="text-2xl mb-4">Reset Password</h2>

      <input
        type="email"
        placeholder="Enter email"
        className="mb-4 p-2 text-black"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleReset} className="bg-purple-600 px-6 py-2 rounded">
        Send Reset Link
      </button>
    </div>
  );
}
