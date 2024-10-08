import React, {createContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storageUser = localStorage.getItem("user");
    if (storageUser) {
      setUser(JSON.parse(storageUser));
    }
    setLoading(false);
  }, []);


  const login = async (email, password) => {
    let response;
    response = await api.post("/login", {email, password});

    const user = response.data.user;
    const token = response.data.token
    const player = response.data.player

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    if (player) {
      localStorage.setItem("player", JSON.stringify(player));
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUser(user);
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    api.defaults.headers.Authorization = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{authenticated:!!user, user, loading, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}