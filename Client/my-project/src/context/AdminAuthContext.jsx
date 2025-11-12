import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

/**
 * 🧩 Context quản lý đăng nhập của ADMIN
 * - Không ảnh hưởng đến user FE
 * - Lưu token riêng: adminToken / adminUser
 * - Kiểm tra token khi reload
 * - Logout sẽ clear đúng phần admin
 */

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Khi reload, lấy token từ localStorage
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Kiểm tra token hết hạn
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUser");
          setAdmin(null);
          navigate("/admin-login");
          return;
        }

        setAdmin({
          id: decoded.id,
          username: decoded.username,
          role: decoded.role || "admin",
        });
      } catch (err) {
        console.error("❌ Lỗi decode adminToken:", err);
        localStorage.removeItem("adminToken");
      }
    }
    setLoading(false);
  }, [navigate]);

  // ✅ Khi đăng nhập thành công
  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      const adminData = {
        id: decoded.id,
        username: decoded.username,
        role: decoded.role || "admin",
      };

      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify(adminData));
      setAdmin(adminData);

      navigate("/admin/dashboard");
    } catch (err) {
      console.error("❌ Lỗi login admin:", err);
    }
  };

  // ✅ Khi đăng xuất (chỉ ảnh hưởng admin)
  const logout = () => {
    try {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      setAdmin(null);

      // ✅ Điều hướng ngay về trang đăng nhập admin
      navigate("/admin-login", { replace: true });
    } catch (err) {
      console.error("❌ Lỗi khi logout admin:", err);
    }
  };

  // ✅ Trả về context
  return (
    <AdminAuthContext.Provider value={{ admin, login, logout, loading }}>
      {!loading && children}
    </AdminAuthContext.Provider>
  );
};

// ✅ Hook sử dụng dễ dàng trong component
export const useAdminAuth = () => useContext(AdminAuthContext);
