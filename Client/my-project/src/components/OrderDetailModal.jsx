import React from "react";
import { X } from "lucide-react";

export default function OrderDetailModal({ order, onClose }) {
  if (!order) return null;

  const total = order.totalPrice || 0;
  const shippingFee = 0;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[99999] bg-black/40 backdrop-blur-sm">
      <div
        className="relative bg-white rounded-lg shadow-xl p-6 w-[600px] max-w-[95vw] max-h-[80vh] overflow-y-auto border border-gray-200"
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black transition"
        >
          <X size={20} />
        </button>

        {/* Tiêu đề */}
        <h2 className="text-[18px] font-bold mb-4 uppercase text-center">
          Chi tiết đơn hàng #{String(order._id).slice(-6)}
        </h2>

        {/* Thông tin đơn */}
        <div className="space-y-1 text-[14px] mb-4">
          <p>
            <span className="font-semibold">Ngày đặt:</span>{" "}
            {new Date(order.createdAt).toLocaleDateString("vi-VN")}
          </p>
          <p>
            <span className="font-semibold">Trạng thái:</span>{" "}
            {order.status === "pending"
              ? "Chờ xác nhận"
              : order.status === "confirmed"
              ? "Đã xác nhận"
              : order.status === "shipping"
              ? "Đang giao hàng"
              : order.status === "completed"
              ? "Đã nhận hàng"
              : "Đã hủy"}
          </p>
          <p>
            <span className="font-semibold">Phương thức thanh toán:</span>{" "}
            {order.paymentMethod === "COD"
              ? "Thanh toán khi nhận hàng (COD)"
              : "Chuyển khoản ngân hàng"}
          </p>
        </div>

        {/* Thông tin người nhận */}
        <h3 className="font-bold text-[15px] mb-2 uppercase">
          Thông tin người nhận
        </h3>
        <div className="border border-gray-200 rounded-md p-3 mb-4 text-[14px] bg-gray-50 leading-relaxed">
          <p>👤 <b>Họ tên:</b> {order.shippingAddress?.fullName}</p>
          <p>📞 <b>SĐT:</b> {order.shippingAddress?.phone}</p>
          <p>🏠 <b>Địa chỉ:</b> {order.shippingAddress?.address}</p>
          <p>🏙️ <b>Thành phố:</b> {order.shippingAddress?.city}</p>
        </div>

        {/* Danh sách sản phẩm */}
        <h3 className="font-bold text-[15px] mb-3 uppercase">
          Sản phẩm trong đơn
        </h3>
        <table className="w-full text-[14px] border border-gray-200 mb-4">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="p-2 border text-left w-[35%]">Sản phẩm</th>
              <th className="p-2 border text-center w-[10%]">SL</th>
              <th className="p-2 border text-center w-[15%]">Màu</th>
              <th className="p-2 border text-center w-[10%]">Size</th>
              <th className="p-2 border text-right w-[15%]">Giá</th>
              <th className="p-2 border text-right w-[15%]">Tổng</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-2">{item.name}</td>
                <td className="p-2 text-center">{item.qty}</td>
                <td className="p-2 text-center">{item.color || "—"}</td>
                <td className="p-2 text-center">{item.size || "—"}</td>
                <td className="p-2 text-right">
                  {item.price.toLocaleString("vi-VN")}₫
                </td>
                <td className="p-2 text-right font-medium text-[#d6001c]">
                  {(item.price * item.qty).toLocaleString("vi-VN")}₫
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tổng kết */}
        <div className="text-[15px] border-t border-gray-200 pt-3 space-y-1 text-right">
          <p>
            <span className="font-semibold">Tạm tính:</span>{" "}
            {total.toLocaleString("vi-VN")}₫
          </p>
          <p>
            <span className="font-semibold">Phí vận chuyển:</span>{" "}
            {shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString("vi-VN")}₫`}
          </p>
          <p className="text-[17px] font-bold text-[#d6001c]">
            Tổng cộng: {(total + shippingFee).toLocaleString("vi-VN")}₫
          </p>
        </div>
      </div>
    </div>
  );
}
