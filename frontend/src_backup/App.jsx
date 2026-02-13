import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useSelector } from "react-redux";

import Homepage from "./pages/Homepage";
// import Auth from "./components/auth/Auth";
import ResetPassword from "./pages/auth/ResetPassword";

function App() {
  // 🔕 DEMO MODE: auth disabled temporarily
  // const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        {/* DEMO MODE: force home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
