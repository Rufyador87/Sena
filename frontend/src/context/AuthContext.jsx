import { createContext, useContext, useMemo, useState } from 'react';
import { httpClient } from '../api/http.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const rawUser = localStorage.getItem('optilogistics_user');
    return rawUser ? JSON.parse(rawUser) : null;
  });

  const login = async (email, password) => {
    const response = await httpClient.post('/auth/login', { email, password });
    const { token, user: profile } = response.data.data;

    localStorage.setItem('optilogistics_token', token);
    localStorage.setItem('optilogistics_user', JSON.stringify(profile));
    setUser(profile);
  };

  const logout = () => {
    localStorage.removeItem('optilogistics_token');
    localStorage.removeItem('optilogistics_user');
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: Boolean(user)
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
