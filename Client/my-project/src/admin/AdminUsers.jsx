import React, { useEffect, useState } from "react";
import { API_BASE } from "../config/api";


export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "user" });
  const [editId, setEditId] = useState(null);

  // 🟢 Lấy danh sách user
  const fetchUsers = async () => {
const res = await fetch("https://thanhdatshoes.id.vn/api/users");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🟡 Tạo mới hoặc cập nhật
  const handleSubmit = async (e) => {
  e.preventDefault();
  const method = editId ? "PUT" : "POST";
  const url = editId
  ? `https://thanhdatshoes.id.vn/api/users/${editId}`
  : `https://thanhdatshoes.id.vn/api/users`;


  await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ username: "", email: "", password: "", role: "user" });
    setEditId(null);
    fetchUsers();
  };

  // 🧹 Xóa user
  const handleDelete = async (id) => {
    if (window.confirm("Xóa user này?")) {
await fetch(`https://thanhdatshoes.id.vn/api/users/${id}`, { method: "DELETE" });
      fetchUsers();
    }
  };

  // ✏️ Chỉnh sửa
  const handleEdit = (u) => {
    setForm({ username: u.username, email: u.email, role: u.role, password: "" });
    setEditId(u._id);
  };

  if (loading) return <p className="p-6">Đang tải...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👤 Quản lý người dùng</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 p-4 bg-gray-100 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-3"
      >
        <input
          className="border p-2 rounded"
          placeholder="Tên đăng nhập"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {!editId && (
          <input
            type="password"
            className="border p-2 rounded"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        )}
        <select
          className="border p-2 rounded"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="col-span-1 md:col-span-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition">
          {editId ? "💾 Lưu thay đổi" : "➕ Thêm người dùng"}
        </button>
      </form>

      {/* Bảng danh sách */}
      <table className="w-full border border-gray-200 text-sm">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-2 border">Tên đăng nhập</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Vai trò</th>
            <th className="p-2 border text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="hover:bg-gray-50">
              <td className="p-2 border">{u.username}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border capitalize">{u.role}</td>
              <td className="p-2 border text-center space-x-2">
                <button
                  onClick={() => handleEdit(u)}
                  className="px-2 py-1 bg-yellow-400 text-white rounded"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(u._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
