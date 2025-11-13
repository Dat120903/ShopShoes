import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // 🧠 Load user từ localStorage (cả nội bộ + Fumee)
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const fumeeToken = localStorage.getItem("fumeesoft_token");
    const storedUser = localStorage.getItem("user");

    // Nếu đã có user lưu sẵn (nội bộ hoặc Fumee) thì set luôn
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      setToken(storedToken);
    }

    // Không có token mà vẫn có fumeeToken thì vẫn coi là đang login
    if (!storedToken && fumeeToken && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // 🧩 Đăng nhập nội bộ
  const login = async (token) => {
    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id || decoded.userId || decoded._id;

      const res = await fetch(
        `https://thanhdatshoes.id.vn/api/auth/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      const currentUser = {
        _id: userId,
        username: data.username || data.fullName || "Người dùng",
        role: decoded.role || "user",
      };

      setUser(currentUser);
      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(currentUser));
      localStorage.setItem("userId", userId);

      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("❌ Lỗi login:", err);
    }
  };

  // 🧩 Đăng xuất (nội bộ + Fumee)
  const logout = async () => {
    setUser(null);
    setToken(null);

    // Xoá token nội bộ
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Xoá token Fumee
    localStorage.removeItem("fumeesoft_token");

    // Xoá user (dùng chung cho cả 2)
    localStorage.removeItem("fumee_user");
    localStorage.removeItem("user");

    // Xoá giỏ hàng
    localStorage.removeItem("cart");

    window.dispatchEvent(new Event("storage"));

    // Reload nhẹ để UI reset hẳn
    setTimeout(() => window.location.reload(), 120);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
