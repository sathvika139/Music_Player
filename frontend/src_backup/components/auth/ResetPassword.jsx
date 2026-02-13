import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();

  return (
    <div style={{ color: "white", padding: "40px" }}>
      <h2>Reset Password</h2>
      <p>Token: {token}</p>
    </div>
  );
};

export default ResetPassword;
