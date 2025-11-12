import React, { useState } from "react";
import { X } from "lucide-react";

export default function AdminOrderDetailModal({ order, onClose, onStatusChange }) {
  if (!order) return null;

  const [status, setStatus] = useState(order.status || "pending");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveStatus = async () => {
    try {
      setSaving(true);
      const res = await fetch(`http://localhost:5000/api/orders/${order._id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (res.ok) {
        setSaved(true);
        onStatusChange(data.order || data);
        setTimeout(() => {
          setSaved(false);
          onClose();
        }, 700);
      } else {
        alert(data.message || "Cập nhật thất bại!");
      }
    } catch (err) {
      alert("Không thể kết nối tới server!");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
      <div className="relative bg-white w-[650px] max-w-[95vw] rounded-lg shadow-xl p-6 max-h-[80vh] overflow-y-auto animate-fadeIn">
        {saved && (
          <div className="absolute top-3 right-3 bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm shadow-sm">
            ✅ Đã lưu thay đổi
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-[17px] font-bold uppercase mb-4 text-center">
          Chi tiết đơn hàng #{order._id?.slice(-5).toUpperCase()}
        </h2>

        <div className="mb-4 text-[15px] space-y-1">
          <p><b>Ngày đặt:</b> {new Date(order.createdAt).toLocaleDateString("vi-VN")}</p>
          <p><b>Phương thức thanh toán:</b> {order.paymentMethod === "COD" ? "COD" : "Chuyển khoản"}</p>
        </div>

        <div className="border border-gray-200 rounded-md p-3 mb-4 bg-gray-50">
          <p className="font-semibold text-[15px] mb-1">THÔNG TIN NGƯỜI NHẬN</p>
          <p>👤 {order.shippingAddress?.fullName}</p>
          <p>📞 {order.shippingAddress?.phone}</p>
          <p>🏠 {order.shippingAddress?.address}</p>
          <p>🏙️ {order.shippingAddress?.city}</p>
        </div>

        {/* 🔹 Bảng sản phẩm rộng hơn */}
        <div className="border border-gray-200 rounded-md mb-4 overflow-hidden">
          <table className="w-full text-[14px] border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-3 border text-left">Tên sản phẩm</th>
                <th className="py-2 px-3 border text-center w-[70px]">SL</th>
                <th className="py-2 px-3 border text-center w-[70px]">Màu</th>
                <th className="py-2 px-3 border text-center w-[70px]">Size</th>
                <th className="py-2 px-3 border text-right w-[100px]">Giá</th>
                <th className="py-2 px-3 border text-right w-[100px]">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="py-2 px-3 border">{item.name}</td>
                  <td className="py-2 px-3 border text-center">{item.qty}</td>
                  <td className="py-2 px-3 border text-center">{item.color || "—"}</td>
                  <td className="py-2 px-3 border text-center">{item.size || "—"}</td>
                  <td className="py-2 px-3 border text-right">
                    {item.price.toLocaleString("vi-VN")}₫
                  </td>
                  <td className="py-2 px-3 border text-right font-medium">
                    {(item.price * item.qty).toLocaleString("vi-VN")}₫
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-[15px] text-right mb-6">
          <p><b>Tạm tính:</b> {order.totalPrice.toLocaleString("vi-VN")}₫</p>
          <p><b>Phí vận chuyển:</b> Miễn phí</p>
          <p className="font-bold text-[#d6001c] mt-1">
            Tổng cộng: {order.totalPrice.toLocaleString("vi-VN")}₫
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full sm:w-[60%] focus:ring-2 focus:ring-[#d6001c]"
          >
            <option value="pending">Chờ xác nhận</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="shipping">Đang giao hàng</option>
            <option value="completed">Đã nhận hàng</option>
            <option value="cancelled">Đã hủy</option>
          </select>

          <button
            onClick={handleSaveStatus}
            disabled={saving}
            className={`w-full sm:w-[35%] py-2 rounded-md text-white font-semibold uppercase transition ${
              saving ? "bg-gray-400 cursor-not-allowed" : "bg-[#111] hover:bg-black"
            }`}
          >
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>
    </div>
  );
}
