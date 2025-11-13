import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartProvider.jsx";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { API_BASE } from "../../config/api";


export default function Cart() {
  const { cartItems = [], increaseQty, decreaseQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  // 🧩 Mã giảm giá
  const [discountCode, setDiscountCode] = useState(localStorage.getItem("discountCode") || "");
  const [discountRate, setDiscountRate] = useState(parseFloat(localStorage.getItem("discountRate") || "0"));
  const [discountValue, setDiscountValue] = useState(parseFloat(localStorage.getItem("discountValue") || "0"));
  const [discountType, setDiscountType] = useState(localStorage.getItem("discountType") || ""); // 🆕 thêm
  const [minOrder, setMinOrder] = useState(Number(localStorage.getItem("minOrder") || "0"));

  // 🚫 Khóa giỏ hàng khi có mã giảm giá
  const [isLocked, setIsLocked] = useState(!!localStorage.getItem("discountCode"));

  // ✅ Tính toán giá trị giỏ hàng
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.qty || 1),
    0
  );
  const discount = discountValue > 0 ? discountValue : subtotal * (discountRate || 0);
  const total = Math.max(subtotal - discount, 0);

  // 🧹 Clear toàn bộ mã giảm giá
  const clearDiscount = () => {
    localStorage.removeItem("discountRate");
    localStorage.removeItem("discountValue");
    localStorage.removeItem("discountCode");
    localStorage.removeItem("discountType"); // 🆕 thêm
    localStorage.removeItem("minOrder");
    setDiscountRate(0);
    setDiscountValue(0);
    setDiscountCode("");
    setDiscountType(""); // 🆕 thêm
    setMinOrder(0);
    setIsLocked(false);
  };

  // ✅ Gọi API kiểm tra mã giảm giá
  const handleApplyCode = async () => {
    const code = discountCode.trim().toUpperCase();
    if (!code) return toast.error("⚠️ Vui lòng nhập mã giảm giá!");

    try {
const res = await fetch("https://thanhdatshoes.id.vn/api/coupons/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, total: subtotal }),
      });

      const data = await res.json();

      if (!res.ok || !data.valid) {
        toast.error(data.message || "Mã giảm giá không hợp lệ!");
        clearDiscount();
        return;
      }

      // ✅ Nếu hợp lệ
      if (data.discountRate > 0) {
        setDiscountRate(data.discountRate);
        setDiscountValue(0);
        setDiscountType("percent"); // 🆕 thêm
        localStorage.setItem("discountRate", data.discountRate.toString());
        localStorage.setItem("discountType", "percent"); // 🆕 thêm
        localStorage.removeItem("discountValue");
      } else {
        setDiscountRate(0);
        setDiscountValue(data.discountValue);
        setDiscountType("fixed"); // 🆕 thêm
        localStorage.setItem("discountValue", data.discountValue.toString());
        localStorage.setItem("discountType", "fixed"); // 🆕 thêm
        localStorage.removeItem("discountRate");
      }

      // ✅ Lưu minOrder để re-check sau
      setMinOrder(data.minOrder || 0);
      localStorage.setItem("minOrder", data.minOrder || "0");

      localStorage.setItem("discountCode", code);
      setIsLocked(true);
      toast.success(data.message || "Áp dụng mã giảm giá thành công!");
    } catch (err) {
      console.error("❌ Lỗi khi kiểm tra mã giảm giá:", err);
      toast.error("Không thể kết nối đến server!");
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("🛒 Giỏ hàng trống! Vui lòng thêm sản phẩm trước khi thanh toán.");
      return;
    }
    localStorage.setItem("checkoutProgress", "2");
    navigate("/checkout");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 pt-[120px] pb-20"
    >
      {/* === Tiêu đề và thanh bước === */}
      <h1 className="text-[30px] font-bold uppercase mb-10 text-center">
        THÔNG TIN GIAO NHẬN & THANH TOÁN
      </h1>

      <div className="flex justify-center mb-10">
        <div className="flex flex-col items-center text-center">
          <p className="text-black font-bold text-[15px] uppercase">01 GIỎ HÀNG</p>
          <p className="text-[13px] text-gray-600 mt-[2px]">
            Quản lý danh mục sản phẩm
          </p>
        </div>
        <div className="w-[100px] h-[1px] mt-[9px] mx-6 bg-gray-300"></div>
        <div className="flex flex-col items-center text-center">
          <p className="text-gray-400 font-semibold text-[15px] uppercase">
            02 THANH TOÁN & GIAO HÀNG
          </p>
          <p className="text-[13px] text-gray-400 mt-[2px]">
            Thông tin giao nhận & thanh toán
          </p>
        </div>
        <div className="w-[100px] h-[1px] mt-[9px] mx-6 bg-gray-300"></div>
        <div className="flex flex-col items-center text-center">
          <p className="text-gray-400 font-semibold text-[15px] uppercase">
            03 XÁC NHẬN
          </p>
          <p className="text-[13px] text-gray-400 mt-[2px]">
            Xem lại và hoàn tất đơn hàng
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* === Danh sách sản phẩm === */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-gray-300 text-[15px] font-semibold uppercase">
              <tr>
                <th className="pb-3">Sản phẩm</th>
                <th className="pb-3 w-[120px]">Giá</th>
                <th className="pb-3 w-[160px]">Số lượng</th>
                <th className="pb-3 w-[140px]">Thành tiền</th>
              </tr>
            </thead>
            <tbody className="text-[15px]">
              {cartItems.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-gray-500">
                    Giỏ hàng của bạn đang trống.
                  </td>
                </tr>
              ) : (
                cartItems.map((item) => (
                  <tr key={item.lineId} className="border-b border-gray-200">
                    <td className="py-6 flex items-center gap-5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[90px] h-[90px] object-cover border"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        {item.color && <p className="text-gray-500 text-[14px]">Màu: {item.color}</p>}
                        {item.size && <p className="text-gray-500 text-[14px]">Size: {item.size}</p>}
                      </div>
                    </td>
                    <td>{Number(item.price).toLocaleString("vi-VN")}₫</td>
                    <td>
                      <div className="flex items-center border border-gray-300 w-fit px-2 rounded-md">
                        <button
                          disabled={isLocked}
                          onClick={() => decreaseQty(item.lineId)}
                          className={`px-2 text-lg font-semibold ${
                            isLocked ? "text-gray-400 cursor-not-allowed" : "hover:text-[#D6001C]"
                          }`}
                        >
                          -
                        </button>
                        <span className="px-3">{item.qty}</span>
                        <button
                          disabled={isLocked}
                          onClick={() => increaseQty(item.lineId)}
                          className={`px-2 text-lg font-semibold ${
                            isLocked ? "text-gray-400 cursor-not-allowed" : "hover:text-[#D6001C]"
                          }`}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="font-semibold text-gray-800">
                      {(item.price * item.qty).toLocaleString("vi-VN")}₫
                      <button
                        disabled={isLocked}
                        onClick={() => removeFromCart(item.lineId)}
                        className={`ml-4 ${
                          isLocked
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-500 hover:text-black transition"
                        }`}
                      >
                        <X size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* === Tổng giỏ hàng === */}
        <div className="w-full lg:w-[380px] border border-gray-300 p-6 h-fit rounded-md shadow-sm">
          <h3 className="text-[18px] font-bold uppercase mb-6">Giá trị giỏ hàng</h3>

          <div className="flex justify-between mb-3 text-[15px]">
            <span>Tổng đơn hàng</span>
            <span className="font-medium">{subtotal.toLocaleString("vi-VN")}₫</span>
          </div>

          {/* Mã giảm giá */}
          <div className="mt-4 mb-4 border-t border-gray-200 pt-4">
            <h4 className="font-semibold mb-2">Mã giảm giá</h4>

            {isLocked ? (
              <div className="flex justify-between items-center">
                <p className="text-green-600 text-sm">
                  Mã <b>{discountCode}</b> đã được áp dụng
                </p>
                <button
                  onClick={clearDiscount}
                  className="text-red-500 text-sm hover:underline"
                >
                  Hủy mã
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Nhập mã giảm giá..."
                  className="border border-gray-300 rounded-md px-3 py-2 flex-1 outline-none focus:border-black"
                />
                <button
                  onClick={handleApplyCode}
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
                >
                  Áp dụng
                </button>
              </div>
            )}

            {discount > 0 && (
              <p className="text-green-600 text-sm mt-2">
                Giảm{" "}
                {discountRate > 0
                  ? `${discountRate * 100}%`
                  : `${discountValue.toLocaleString("vi-VN")}₫`}{" "}
                — {discount.toLocaleString("vi-VN")}₫
              </p>
            )}
          </div>

          <div className="border-t border-gray-200 mt-3 mb-3" />
          <div className="flex justify-between mb-3 text-[15px]">
            <span>Tổng giá trị</span>
            <span className="font-semibold">{total.toLocaleString("vi-VN")}₫</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCheckout}
            className="w-full bg-black text-white py-3 uppercase text-[14px] font-semibold hover:bg-gray-800 transition"
          >
            Đặt hàng và thanh toán
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}
