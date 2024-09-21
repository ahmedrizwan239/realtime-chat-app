import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OTP from "./screens/OTP";
import SignupLogin from "./screens/SignupLogin";
import Dashboard from "./screens/Dashboard";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupLogin />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
