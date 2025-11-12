import React, { useEffect, useState } from "react";
import AdminOrderDetailModal from "./AdminOrderDetailModal";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // 🧠 Lấy danh sách tất cả đơn hàng từ backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders");
        const data = await res.json();
        setOrders(data);
        setFilteredOrders(data);
      } catch (err) {
        console.error("❌ Lỗi lấy đơn hàng:", err);
      }
    };
    fetchOrders();
  }, []);

  // 🔍 Lọc & tìm kiếm
  useEffect(() => {
    let result = [...orders];

    if (filterStatus !== "all") {
      result = result.filter((o) => o.status === filterStatus);
    }

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (o, i) =>
          o.shippingAddress?.fullName?.toLowerCase().includes(term) ||
          o.discountCode?.toLowerCase().includes(term) ||
          ("#" + String(i + 1).padStart(2, "0")).includes(term)
      );
    }

    setFilteredOrders(result);
  }, [filterStatus, searchTerm, orders]);

  const handleStatusChange = (updatedOrder) => {
    setOrders((prev) =>
      prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
    );
    setFilteredOrders((prev) =>
      prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
    );
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-[24px] font-bold uppercase">Quản lý đơn hàng</h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-[15px] font-semibold text-gray-700">
              Trạng thái:
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#d6001c]"
            >
              <option value="all">Tất cả</option>
              <option value="pending">Chờ xác nhận</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="shipping">Đang giao hàng</option>
              <option value="completed">Đã nhận hàng</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="🔍 Tìm theo tên, mã đơn hoặc mã giảm giá..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-[15px] w-full sm:w-[280px] focus:outline-none focus:ring-2 focus:ring-[#d6001c]"
          />
        </div>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full text-[15px] border-collapse">
          <thead className="bg-gray-100 uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4 border text-center w-[60px]">#</th>
              <th className="py-3 px-4 border text-left">Khách hàng</th>
              <th className="py-3 px-4 border text-center">Ngày đặt</th>
              <th className="py-3 px-4 border text-center">Mã giảm giá</th>
              <th className="py-3 px-4 border text-right">Tổng tiền</th>
              <th className="py-3 px-4 border text-center">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  Không có đơn hàng phù hợp.
                </td>
              </tr>
            ) : (
              filteredOrders.map((o, index) => (
                <tr
                  key={o._id}
                  onClick={() => setSelectedOrder(o)}
                  className="hover:bg-gray-50 cursor-pointer transition"
                >
                  <td className="py-3 px-4 border text-center font-semibold text-gray-700">
                    #{String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="py-3 px-4 border text-gray-800">
                    {o.shippingAddress?.fullName || "Ẩn danh"}
                  </td>
                  <td className="py-3 px-4 border text-center text-gray-700">
                    {new Date(o.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="py-3 px-4 border text-center text-green-600 font-semibold">
                    {o.discountCode || "—"}
                  </td>
                  <td className="py-3 px-4 border text-right text-[#d6001c] font-semibold">
                    {o.totalPrice?.toLocaleString("vi-VN")}₫
                  </td>
                  <td className="py-3 px-4 border text-center">
                    <span
                      className={`px-2 py-1 rounded-md text-[14px] ${
                        o.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : o.status === "confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : o.status === "shipping"
                          ? "bg-purple-100 text-purple-700"
                          : o.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {o.status === "pending"
                        ? "Chờ xác nhận"
                        : o.status === "confirmed"
                        ? "Đã xác nhận"
                        : o.status === "shipping"
                        ? "Đang giao hàng"
                        : o.status === "completed"
                        ? "Đã nhận hàng"
                        : "Đã hủy"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <AdminOrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
