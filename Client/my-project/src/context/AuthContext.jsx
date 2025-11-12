import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // 🧠 Tải lại user khi reload
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setLoading(false);
      return;
    }

    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        const userId = decoded.id || decoded.userId || decoded._id;

        fetch(`http://localhost:5000/api/auth/user/${userId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
          .then((res) => res.json())
          .then((data) => {
            const currentUser = {
              _id: userId,
              username: data.username || data.fullName || "Người dùng",
              role: decoded.role || "user",
            };
            setUser(currentUser);
            localStorage.setItem("user", JSON.stringify(currentUser));
            localStorage.setItem("userId", userId);
          });
      } catch (err) {
        console.error("❌ Lỗi decode JWT:", err);
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);

  // 🧩 Đăng nhập
  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id || decoded.userId || decoded._id;

      fetch(`http://localhost:5000/api/auth/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          const currentUser = {
            _id: userId,
            username: data.username || data.fullName || "Người dùng",
            role: decoded.role || "user",
          };
          setUser(currentUser);
          setToken(token);
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
          localStorage.setItem("user", JSON.stringify(currentUser));
          window.dispatchEvent(new Event("storage")); // reload CartProvider
        });
    } catch (err) {
      console.error("❌ Lỗi login:", err);
    }
  };

  // 🧩 Đăng xuất
  const logout = async () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    localStorage.removeItem("cart"); // clear cache giỏ
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
