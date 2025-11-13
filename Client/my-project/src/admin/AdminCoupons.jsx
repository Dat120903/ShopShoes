// src/admin/AdminCoupons.jsx
import React, { useEffect, useState } from "react";
import { API_BASE } from "../config/api";


export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({
    code: "",
    discountType: "percent",
    value: "",
    minOrder: "",
    expiresAt: "",
  });

  // 🔄 Lấy danh sách mã
  const fetchCoupons = async () => {
const res = await fetch("https://thanhdatshoes.id.vn/api/coupons");
    const data = await res.json();
    setCoupons(data);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // ➕ Tạo mã mới
  const handleSubmit = async (e) => {
    e.preventDefault();
const res = await fetch("https://thanhdatshoes.id.vn/api/coupons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("✅ Tạo mã thành công");
      setForm({
        code: "",
        discountType: "percent",
        value: "",
        minOrder: "",
        expiresAt: "",
      });
      fetchCoupons();
    } else {
      alert("⚠️ Lỗi khi tạo mã");
    }
  };

  // 🗑️ Xóa mã
  const deleteCoupon = async (id) => {
    if (!window.confirm("Xóa mã này?")) return;
    await fetch(`${API_BASE}/coupons/${id}`, { method: "DELETE" });
    fetchCoupons();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Quản lý mã giảm giá</h1>

      {/* Form thêm mới */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-white p-4 rounded shadow mb-8"
      >
        <input
          type="text"
          placeholder="Mã (VD: SALE20)"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <select
          value={form.discountType}
          onChange={(e) => setForm({ ...form, discountType: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="percent">Phần trăm (%)</option>
          <option value="fixed">Số tiền (₫)</option>
        </select>
        <input
          type="number"
          placeholder="Giá trị"
          value={form.value}
          onChange={(e) => setForm({ ...form, value: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Đơn tối thiểu"
          value={form.minOrder}
          onChange={(e) => setForm({ ...form, minOrder: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={form.expiresAt}
          onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-[#111] text-white rounded py-2 hover:bg-[#333] transition md:col-span-5"
        >
          Tạo mã
        </button>
      </form>

      {/* Bảng danh sách */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Mã</th>
              <th className="p-3 border">Loại</th>
              <th className="p-3 border">Giá trị</th>
              <th className="p-3 border">Đơn tối thiểu</th>
              <th className="p-3 border">Hết hạn</th>
              <th className="p-3 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c._id} className="text-center">
                <td className="border p-2 font-semibold">{c.code}</td>
                <td className="border p-2">
                  {c.discountType === "percent" ? "%" : "₫"}
                </td>
                <td className="border p-2">{c.value}</td>
                <td className="border p-2">
                  {c.minOrder?.toLocaleString()}₫
                </td>
                <td className="border p-2 text-gray-600">
                  {new Date(c.expiresAt).toLocaleDateString("vi-VN")}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => deleteCoupon(c._id)}
                    className="text-red-600 hover:underline"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan="6" className="text-gray-500 py-6 text-center">
                  Chưa có mã giảm giá nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
