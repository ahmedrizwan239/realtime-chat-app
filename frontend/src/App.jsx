import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OTP from './components/OTP';
import SignupLogin from './components/SignupLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupLogin />} />
        <Route path="/otp" element={<OTP />} />
      </Routes>
    </Router>
  );
}

export default App;
