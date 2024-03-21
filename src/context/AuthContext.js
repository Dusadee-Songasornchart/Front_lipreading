// context/AuthContext.js
import Cookies from 'js-cookie';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const getInitialUser = () => {
    try {
      const storedToken = Cookies.get('token');
      return storedToken ? storedToken : null;
    } catch (error) {
      console.error('Error getting initial user:', error);
      return null;
    }
  };

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getInitialUser);
  const login = (token) => {
    // Set the user and token in the context
    setToken(token);
    Cookies.set('token',token)
  };

  const logout = () => {
    // Remove user and token from the context
    // Set Token to null how ??????
    setToken(null);
    Cookies.set('token',null)

  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
