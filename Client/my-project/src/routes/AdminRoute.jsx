import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";

export default function AdminRoute({ children }) {
  const { admin, loading } = useAdminAuth();

  if (loading) return <div className="text-center mt-10">Đang xác thực...</div>;
  if (!admin) return <Navigate to="/admin-login" replace />;
  if (admin.role !== "admin") return <Navigate to="/" replace />;

  return children;
}
