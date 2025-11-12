import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  TicketPercent, // 🧩 icon mới cho Coupons
} from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";

const navLinks = [
  { label: "Dashboard", icon: <LayoutDashboard size={18} />, href: "/admin/dashboard" },
  { label: "Products", icon: <Package size={18} />, href: "/admin/products" },
  { label: "Orders", icon: <ShoppingCart size={18} />, href: "/admin/orders" },
  { label: "Users", icon: <Users size={18} />, href: "/admin/users" },
  { label: "Coupons", icon: <TicketPercent size={18} />, href: "/admin/coupons" }, // ✅ thêm mới
];

export default function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAdminAuth();

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      logout();
    }
  };

  return (
    <aside className="w-64 bg-white shadow-lg h-screen sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="text-center font-bold text-xl text-red-600 py-6 border-b">
        EVASHOES ADMIN
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition
              ${
                location.pathname === link.href
                  ? "bg-red-100 text-red-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-red-500"
              }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>

      {/* 🔴 Nút Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 px-4 py-3 border-t text-gray-500 hover:text-red-500 transition"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </aside>
  );
}
