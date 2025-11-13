import React, { useState } from "react";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config/api";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
const res = await fetch("https://thanhdatshoes.id.vn/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.token) {
        login(data.token);
        alert("✅ Đăng nhập admin thành công!");
        navigate("/admin/dashboard");
      } else {
        alert("⚠️ " + (data.message || "Sai thông tin đăng nhập!"));
      }
    } catch (err) {
      console.error("❌ Lỗi đăng nhập admin:", err);
      alert("Không thể kết nối đến server!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-[360px]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Đăng nhập quản trị
        </h2>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full border p-2 mb-3 rounded outline-none"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border p-2 mb-4 rounded outline-none"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
