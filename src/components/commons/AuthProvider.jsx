import { createContext, useContext, useEffect, useState } from "react";
import {
  EMAIL_ID_KEY,
  NAME_KEY,
  ACCESS_TOKEN_KEY,
  USERID_KEY,
} from "../../utils/Constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const setData = (data) => {
    if (data.access_token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
      setAccessToken(data.access_token);
    }

    if (data.user_id) {
      localStorage.setItem(USERID_KEY, data.user_id);
      setUserId(data.user_id);
    }

    if (data.name) {
      localStorage.setItem(NAME_KEY, data.name);
      setName(data.name);
    }

    if (data.email) {
      localStorage.setItem(EMAIL_ID_KEY, data.email);
      setEmail(data.email);
    }
  };

  const clearUserData = () => {
    localStorage.removeItem(EMAIL_ID_KEY);
    localStorage.removeItem(NAME_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USERID_KEY);
    setAccessToken(null);
    setEmail(null);
    setName(null);
    setUserId(null);
  };

  useEffect(() => {
    const newAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const newUserId = localStorage.getItem(USERID_KEY);
    const newName = localStorage.getItem(NAME_KEY);
    const newEmail = localStorage.getItem(EMAIL_ID_KEY);
  
  
    setAccessToken(newAccessToken);
    setUserId(newUserId);
    setName(newName);
    setEmail(newEmail);
  }, []);

  useEffect(() => {
  }, [name, accessToken, userId, email]);
  

  return (
    <AuthContext.Provider
      value={{ accessToken, userId, email, name, setData, clearUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
