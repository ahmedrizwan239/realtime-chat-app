// src/context/AuthContext.js
import { createContext, useState } from 'react';

// Create a context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isOTPVerified, setIsOTPVerified] = useState(false);  // State for OTP verification

  return (
    <AuthContext.Provider value={{ isOTPVerified, setIsOTPVerified }}>
      {children}  {/* Wrap the application or specific components here */}
    </AuthContext.Provider>
  );
};
