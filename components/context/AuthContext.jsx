import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // On mount, check if token exists and fetch user
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch('http://localhost:8000/admin/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          if (!res.ok) throw new Error('Session expired');
          return res.json();
        })
        .then(data => setUser(data))
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = async (credentials) => {
    setAuthError(null);
    try {
      const res = await fetch('http://localhost:8000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Login failed');

      localStorage.setItem('token', data.access_token);

      const userRes = await fetch('http://localhost:8000/admin/me', {
        headers: { 'Authorization': `Bearer ${data.access_token}` }
      });

      if (!userRes.ok) throw new Error('Failed to fetch user data');

      const userData = await userRes.json();
      setUser(userData);
      return data;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Register function (optional)
  const register = async (userData) => {
    setAuthError(null);
    try {
      const res = await fetch('http://localhost:8000/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Registration failed');

      localStorage.setItem('token', data.access_token);

      const userRes = await fetch('http://localhost:8000/admin/me', {
        headers: { 'Authorization': `Bearer ${data.access_token}` }
      });

      if (!userRes.ok) throw new Error('Failed to fetch user data');

      const userDataRes = await userRes.json();
      setUser(userDataRes);
      return data;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  };
  

  // Value to pass down via context
  const value = {
    user,
    isLoading,
    authError,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
