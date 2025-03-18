import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserProfile();
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/auth/profile');
      setUser(res.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
      logout();
    }
  };


  const login = async ({ email, password }) => {
    const res = await axios.post('http://localhost:3001/api/auth/login', {
      email,
      password
    });
    const data = res.data;
    setUser(data.user);
    localStorage.setItem('token', data.token);
  };

  const signup = async ({ username, email, password }) => {
    const res = await axios.post('http://localhost:3001/api/auth/signup', {
      username,
      email,
      password
    });
    const data = res.data;
    setUser(data.user);
    localStorage.setItem('token', data.token);
  };
  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
