import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

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

      const res = await fetch(
        `https://thanhdatshoes.id.vn/api/auth/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${receivedToken}` },
        }
      );

      const data = await res.json();

      const currentUser = {
        _id: userId,
        username: data.username || data.fullName || "Người dùng",
        role: decoded.role || "user",
      };

      // Lưu vào state + local
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

  // ============================================
  // 🚀 ĐĂNG NHẬP BẰNG FUMEE
  // ============================================
  const loginByFumee = async (fumeeToken) => {
    try {
      // Gửi token Fumee → BE xử lý → trả về token nội bộ
      const res = await fetch("https://thanhdatshoes.id.vn/api/auth/fumee-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: fumeeToken }),
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        console.error("❌ Fumee login failed:", data);
        return;
      }

      // → Login bằng token nội bộ
      await login(data.token);

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

    // xoá cả fumee token nếu còn
    localStorage.removeItem("fumeesoft_token");
    localStorage.removeItem("fumee_user");

    // xoá giỏ
    localStorage.removeItem("cart");

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
