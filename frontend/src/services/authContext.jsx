import { createContext} from 'react';

// Create a context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider >
      {children}
    </AuthContext.Provider>
  );
};
