// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OTP from './components/OTP';
import SignupLogin from './components/SignupLogin';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './services/authContext'; // Import the AuthProvider

function App() {
  return (
    <AuthProvider> {/* Wrap everything in AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<SignupLogin />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
