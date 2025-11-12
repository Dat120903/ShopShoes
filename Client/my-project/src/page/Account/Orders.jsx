import React, { useEffect, useState } from "react";
import AccountSidebar from "../../components/AccountSidebar";
import OrderDetailModal from "../../components/OrderDetailModal";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5000/api/orders/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("❌ Lỗi lấy đơn hàng:", err));
  }, [userId]);

  const handleViewOrder = (order) => setSelectedOrder(order);
  const closeModal = () => setSelectedOrder(null);

  return (
    <section className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8 mt-[120px] min-h-[70vh]">
      <h1 className="text-[32px] font-bold uppercase mb-10">ĐƠN HÀNG CỦA TÔI</h1>

      <div className="flex flex-col md:flex-row gap-10 text-[16px] leading-relaxed text-gray-800">
        <AccountSidebar />

        <div className="flex-1 overflow-x-auto">
          {orders.length === 0 ? (
            <p className="text-gray-500 mt-5">Bạn chưa có đơn hàng nào.</p>
          ) : (
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100 text-left text-[16px] uppercase text-gray-700">
                <tr>
                  <th className="py-4 px-5 border-b">Đơn hàng</th>
                  <th className="py-4 px-5 border-b">Ngày</th>
                  <th className="py-4 px-5 border-b">Trạng thái</th>
                  <th className="py-4 px-5 border-b">Tổng tiền</th>
                  <th className="py-4 px-5 border-b">Hóa đơn</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o, index) => (
                  <tr key={o._id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-5 font-semibold">
                      #{String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="py-4 px-5">
                      {new Date(o.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="py-4 px-5">
                      {o.status === "pending"
                        ? "Chờ xác nhận"
                        : o.status === "confirmed"
                        ? "Đã xác nhận"
                        : o.status === "shipping"
                        ? "Đang giao hàng"
                        : o.status === "completed"
                        ? "Đã nhận hàng"
                        : "Đã hủy"}
                    </td>
                    <td className="py-4 px-5 font-medium text-[#d6001c]">
                      {o.totalPrice.toLocaleString("vi-VN")}₫
                    </td>
                    <td className="py-4 px-5">
                      <button
                        onClick={() => handleViewOrder(o)}
                        className="bg-black text-white px-6 py-2 uppercase text-[14px] font-semibold hover:bg-gray-800 transition"
                      >
                        Xem
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={closeModal} />
      )}
    </section>
  );
}
