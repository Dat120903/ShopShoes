// src/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("❌ Lỗi lấy thống kê:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading)
    return <p className="text-gray-500 mt-6 text-lg">Đang tải dữ liệu...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Bảng điều khiển
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Tổng sản phẩm */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
          <p className="text-gray-500 text-sm font-medium uppercase">
            Tổng sản phẩm
          </p>
          <h2 className="text-3xl font-semibold text-gray-900 mt-2">
            {stats.totalProducts}
          </h2>
        </div>

        {/* Tổng đơn hàng */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
          <p className="text-gray-500 text-sm font-medium uppercase">
            Tổng đơn hàng
          </p>
          <h2 className="text-3xl font-semibold text-gray-900 mt-2">
            {stats.totalOrders}
          </h2>
        </div>

        {/* Tổng người dùng */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
          <p className="text-gray-500 text-sm font-medium uppercase">
            Tổng người dùng
          </p>
          <h2 className="text-3xl font-semibold text-gray-900 mt-2">
            {stats.totalUsers}
          </h2>
        </div>
      </div>
    </div>
  );
}
