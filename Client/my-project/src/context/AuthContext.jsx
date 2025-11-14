import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { API_BASE } from "../config/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // LOAD USER KHI RELOAD TRANG
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // ===========================
  // LOGIN NỘI BỘ
  // ===========================
  const login = async (receivedToken) => {
    try {
      const decoded = jwtDecode(receivedToken);

      // LẤY USER TỪ BACKEND
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${receivedToken}` },
      });

      const data = await res.json();
      if (!data.user?._id) {
        console.error("Không lấy được userId từ backend");
        return;
      }

      const userId = data.user._id;

      const currentUser = {
        _id: userId,
        username: data.user.username,
        role: data.user.role,
      };

      setUser(currentUser);
      setToken(receivedToken);

      localStorage.setItem("token", receivedToken);
      localStorage.setItem("user", JSON.stringify(currentUser));
      localStorage.setItem("userId", userId);

      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("❌ Lỗi login:", err);
    }
  };

  // ===========================
  // LOGIN FUMEE
  // ===========================
  const loginByFumee = async (fumeeToken) => {
    try {
      const res = await fetch(`${API_BASE}/auth/fumee-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: fumeeToken }),
      });

      const data = await res.json();
      if (!data.token) return;

      const decoded = jwtDecode(data.token);
      const userId = data.user._id;

      const fumeeUser = {
        _id: userId,
        username: data.user.displayName,
        role: "user",
        phone: data.user.phone,
        email: data.user.email,
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("fumeesoft_token", fumeeToken);
      localStorage.setItem("user", JSON.stringify(fumeeUser));
      localStorage.setItem("userId", userId);

      setUser(fumeeUser);
      setToken(data.token);

      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("❌ Lỗi login Fumee:", err);
    }
  };

  // ===========================
  // ĐĂNG XUẤT
  // ===========================
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("fumeesoft_token");
    localStorage.removeItem("fumee_user");

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("cart_user_")) localStorage.removeItem(key);
    });

    window.dispatchEvent(new Event("storage"));
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, loginByFumee, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
