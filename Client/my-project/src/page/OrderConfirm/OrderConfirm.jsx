import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../components/CheckoutSteps";

const fmtVND = (n) => `${Number(n || 0).toLocaleString("vi-VN")}₫`;

export default function OrderConfirm() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const local = localStorage.getItem("lastOrder");
    if (!local) {
      navigate("/checkout", { replace: true });
      return;
    }
    const parsed = JSON.parse(local);
    setOrder(parsed);

    // 🔹 Lấy lại đơn từ DB (nếu có _id)
    if (parsed?._id) {
      fetch(`http://localhost:5000/api/orders/${parsed._id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data._id) setOrder(data);
        })
        .catch((err) => console.error("❌ Lỗi lấy đơn hàng:", err))
        .finally(() => setLoading(false));
    } else setLoading(false);
  }, [navigate]);

  const handleBackToShop = () => {
    localStorage.setItem("checkoutProgress", "1");
    navigate("/shoplist");
  };

  // 🔹 Thông tin giảm giá & thanh toán
  const discountType = localStorage.getItem("discountType") || "";
  const discountCode = localStorage.getItem("discountCode") || "";
  const discountRate = parseFloat(localStorage.getItem("discountRate") || "0");
  const discountValue = parseFloat(localStorage.getItem("discountValue") || "0");
  const paymentMethod = localStorage.getItem("paymentMethod") || "";

  if (loading)
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Đang tải đơn hàng...
      </div>
    );

  if (!order)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
        <p>Không tìm thấy đơn hàng nào!</p>
        <button
          onClick={handleBackToShop}
          className="mt-4 px-5 py-3 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Quay lại cửa hàng
        </button>
      </div>
    );

  // 🔹 Tính toán
  const createdAt = new Date(order.createdAt || Date.now());
  const subtotal = order.subtotal || order.totalPrice || 0;
  const discount =
    discountType === "percent"
      ? subtotal * discountRate
      : discountType === "fixed"
      ? discountValue
      : 0;
  const shippingFee = order.shippingFee || 0;
  const total = order.totalPrice || order.total || subtotal - discount + shippingFee;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 pt-[130px] pb-24 bg-white"
    >
      <h1 className="text-[30px] font-bold uppercase mb-10">
        Xác nhận đơn hàng
      </h1>

      <CheckoutSteps current={3} />

      {/* ✅ Thông báo thành công */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mt-8 mb-10"
      >
        <div className="w-[76px] h-[76px] rounded-full border-2 border-green-400 mx-auto flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 7L9 18l-5-5"
              stroke="green"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="text-[22px] font-semibold mt-4 text-green-700">
          Đặt hàng thành công!
        </h2>
        <p className="text-gray-500 mt-1">
          Cảm ơn bạn đã mua sắm cùng <strong>Evashoes</strong> 💖
        </p>

        <button
          onClick={handleBackToShop}
          className="mt-6 px-6 py-3 bg-black text-white rounded-md text-[14px] font-semibold uppercase hover:bg-gray-800 transition"
        >
          ← Quay lại mua sắm
        </button>
      </motion.div>

      {/* 🔹 Thông tin đơn hàng */}
      <div className="border border-dashed border-gray-400 p-6 max-w-[820px] mx-auto mb-10 rounded-md">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[14px]">
          <div>
            <p className="text-gray-500">Mã đơn hàng</p>
            <p className="font-medium">{order._id || order.id || "—"}</p>
          </div>
          <div>
            <p className="text-gray-500">Ngày đặt</p>
            <p className="font-medium">
              {createdAt.toLocaleDateString("vi-VN")}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Tổng giá trị</p>
            <p className="font-medium">{fmtVND(total)}</p>
          </div>
          <div>
            <p className="text-gray-500">Thanh toán</p>
            <p className="font-medium capitalize">
              {order.paymentMethod === "bank"
                ? "Chuyển khoản"
                : order.paymentMethod === "COD"
                ? "Khi nhận hàng"
                : order.paymentMethod || paymentMethod || "—"}
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Tóm tắt thanh toán */}
      <div className="max-w-[820px] mx-auto mb-8 bg-gray-50 border border-gray-200 rounded-md p-6">
        <h3 className="text-[16px] font-semibold uppercase mb-4">
          Tóm tắt thanh toán
        </h3>

        <div className="space-y-2 text-[14px]">
          <div className="flex justify-between">
            <span className="text-gray-600">Phương thức thanh toán:</span>
            <span className="font-medium capitalize">
              {order.paymentMethod === "bank"
                ? "Chuyển khoản qua ngân hàng"
                : order.paymentMethod === "COD"
                ? "Thanh toán khi nhận hàng"
                : paymentMethod || "—"}
            </span>
          </div>

          {discount > 0 ? (
            <div className="flex justify-between text-green-700">
              <span>
                Mã giảm giá: <strong>{discountCode}</strong>{" "}
                {discountType === "percent"
                  ? `(${discountRate * 100}%)`
                  : `(Giảm ${fmtVND(discountValue)})`}
              </span>
              <span>-{fmtVND(discount)}</span>
            </div>
          ) : (
            <div className="flex justify-between">
              <span className="text-gray-600">Mã giảm giá:</span>
              <span className="text-gray-500 italic">Không áp dụng</span>
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Chi tiết sản phẩm */}
      <div className="border border-gray-300 p-6 rounded-md shadow-sm max-w-[820px] mx-auto">
        <h3 className="text-[16px] font-semibold uppercase mb-4">
          Chi tiết đơn hàng
        </h3>

        <div className="grid grid-cols-12 text-[14px] font-semibold border-b border-gray-200 pb-2 mb-2">
          <div className="col-span-9">SẢN PHẨM</div>
          <div className="col-span-3 text-right">GIÁ</div>
        </div>

        {order.items?.map((it, i) => (
          <div
            key={i}
            className="grid grid-cols-12 text-[14px] py-2 border-b border-gray-100"
          >
            <div className="col-span-9 text-gray-700">
              {it.name} x{it.qty}
              <div className="text-gray-500 text-[13px] ml-2">
                Màu: {it.color || "—"} | Size: {it.size || "—"}
              </div>
            </div>
            <div className="col-span-3 text-right">
              {fmtVND(it.price * it.qty)}
            </div>
          </div>
        ))}

        <div className="grid grid-cols-12 text-[14px] py-2 border-t border-gray-200 mt-2">
          <div className="col-span-9 text-gray-600">Tạm tính</div>
          <div className="col-span-3 text-right">{fmtVND(subtotal)}</div>
        </div>

        {discount > 0 && (
          <div className="grid grid-cols-12 text-[14px] py-2 text-green-600">
            <div className="col-span-9">
              Mã giảm giá ({discountCode}){" "}
              {discountType === "percent"
                ? `- ${discountRate * 100}%`
                : `- ${fmtVND(discountValue)}`}
            </div>
            <div className="col-span-3 text-right">-{fmtVND(discount)}</div>
          </div>
        )}

        <div className="grid grid-cols-12 text-[14px] py-2">
          <div className="col-span-9 text-gray-600">Phí vận chuyển</div>
          <div className="col-span-3 text-right">
            {shippingFee ? fmtVND(shippingFee) : "Miễn phí"}
          </div>
        </div>

        <div className="grid grid-cols-12 text-[15px] font-semibold py-3 border-t border-gray-200">
          <div className="col-span-9">Tổng cộng</div>
          <div className="col-span-3 text-right">{fmtVND(total)}</div>
        </div>
      </div>
    </motion.section>
  );
}
