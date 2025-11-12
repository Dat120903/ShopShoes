// src/admin/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar trái */}
      <Sidebar />

      {/* Phần nội dung chính */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet /> {/* nơi load từng trang con */}
      </main>
    </div>
  );
}
