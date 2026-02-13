import { useDispatch, useSelector } from "react-redux";
import { openAuthModal, closeAuthModal } from "../../redux/slices/uiSlice";
import { clearError, logout } from "../../redux/slices/authSlice";
import Login from "./Login";
import Signup from "./Signup";
import Modal from "../common/Modal";
import "../../css/auth/authButtons.css";

// 🔥 DEMO MODE FLAG
const DEMO_MODE = true;

const Auth = ({ children = null }) => {
  // 🔥 SHORT-CIRCUIT AUTH COMPLETELY
  if (DEMO_MODE) {
    return children;
  }

  const dispatch = useDispatch();

  const { authModalOpen, authMode } = useSelector((state) => state.ui);
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      {/* TOP RIGHT AUTH AREA */}
      <div className="auth-top-right">
        {!isAuthenticated ? (
          <>
            <button
              className="auth-btn signup"
              onClick={() => {
                dispatch(clearError());
                dispatch(openAuthModal("signup"));
              }}
            >
              Signup
            </button>

            <button
              className="auth-btn login"
              onClick={() => {
                dispatch(clearError());
                dispatch(openAuthModal("login"));
              }}
            >
              Login
            </button>
          </>
        ) : (
          <button
            className="auth-btn logout"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        )}
      </div>

      {/* AUTH MODAL */}
      {authModalOpen && (
        <Modal onClose={() => dispatch(closeAuthModal())}>
          {authMode === "login" && <Login />}
          {authMode === "signup" && <Signup />}
        </Modal>
      )}
    </>
  );
};

export default Auth;
