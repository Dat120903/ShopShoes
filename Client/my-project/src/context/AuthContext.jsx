import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { API_BASE } from "../config/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // ============================================
  // 🚀 LOAD USER LÚC RELOAD TRANG
  // ============================================
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // ============================================
  // 🚀 ĐĂNG NHẬP NỘI BỘ
  // ============================================
  const login = async (receivedToken) => {
    try {
      const decoded = jwtDecode(receivedToken);
      const userId = decoded.id || decoded.userId || decoded._id;

      const res = await fetch(`${API_BASE}/auth/user/${userId}`, {
        headers: { Authorization: `Bearer ${receivedToken}` },
      });

      const data = await res.json();

      const currentUser = {
        _id: userId,
        username: data.username || data.fullName || "Người dùng",
        role: decoded.role || "user",
      };

      setUser(currentUser);
      setToken(receivedToken);

      localStorage.setItem("token", receivedToken);
      localStorage.setItem("user", JSON.stringify(currentUser));
      localStorage.setItem("userId", userId);

      // cho các context khác (Cart, Wishlist) bắt được userId mới
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("❌ Lỗi login:", err);
    }
  };

  // ============================================
  // 🚀 ĐĂNG NHẬP BẰNG FUMEE
  // ============================================
  const loginByFumee = async (fumeeToken) => {
    try {
      const res = await fetch(`${API_BASE}/auth/fumee-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: fumeeToken }),
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        console.error("❌ Fumee login failed:", data);
        return;
      }

      const decoded = jwtDecode(data.token);
      const userId = decoded.id || decoded.userId || decoded._id;

      const fumeeUser = {
        _id: userId,
        username: data.user?.displayName || data.user?.username || "User Fumee",
        fullName: data.user?.displayName,
        phone: data.user?.phone,
        email: data.user?.email,
        role: "user",
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("fumeesoft_token", fumeeToken);
      localStorage.setItem("user", JSON.stringify(fumeeUser));
      localStorage.setItem("userId", userId);

      setUser(fumeeUser);
      setToken(data.token);

      // 🔥 CỰC QUAN TRỌNG: để Wishlist / Cart cập nhật ngay
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("❌ Lỗi login Fumee:", err);
    }
  };

  // ============================================
  // 🚀 ĐĂNG XUẤT
  // ============================================
  const logout = async () => {
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
      value={{
        user,
        token,
        login,
        loginByFumee,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
