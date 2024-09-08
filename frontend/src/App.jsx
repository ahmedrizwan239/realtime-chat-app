import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OTP from './components/OTP';
import SignupLogin from './components/SignupLogin';
import Dashboard from './components/Dashboard';

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
