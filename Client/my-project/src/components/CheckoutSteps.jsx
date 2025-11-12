import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CheckoutSteps({ current }) {
  const navigate = useNavigate();
  const location = useLocation();

  // 🧭 Tiến trình đã lưu (1 = Giỏ hàng, 2 = Thanh toán, 3 = Xác nhận)
  const progress = Number(localStorage.getItem("checkoutProgress") || "1");
  const isLocked = progress === 3;

  const goto = (step) => {
    if (isLocked || step > progress) return;
    if (step === 1 && location.pathname !== "/cart") navigate("/cart");
    if (step === 2 && location.pathname !== "/checkout") navigate("/checkout");
    if (step === 3 && location.pathname !== "/order-confirm") navigate("/order-confirm");
  };

  const renderStep = (step, title, sub, isActive, isLast) => (
    <React.Fragment key={step}>
      <div
        onClick={() => goto(step)}
        className={`flex flex-col items-center text-center transition-all select-none
          ${
            isActive
              ? "text-black font-bold cursor-default" // 🔥 bước hiện tại đậm
              : step < current
              ? "text-gray-700 font-semibold cursor-pointer hover:text-black" // 🔥 bước trước click được
              : "text-gray-400 font-medium cursor-not-allowed" // 🔥 bước sau mờ, không click
          }`}
      >
        {/* ✅ hiển thị số và tên cùng in đậm nếu active */}
        <span
          className={`uppercase tracking-wide ${
            isActive ? "font-bold text-black" : "font-semibold"
          }`}
        >
          {String(step).padStart(2, "0")} {title}
        </span>

        <span
          className={`text-[13px] normal-case mt-[2px] ${
            isActive ? "text-gray-700" : "text-gray-400"
          }`}
        >
          {sub}
        </span>
      </div>

      {/* Gạch nối giữa các bước */}
      {!isLast && (
        <div
          className={`w-[100px] h-[1px] mt-[10px] mx-6 ${
            step < current ? "bg-gray-500" : "bg-gray-300"
          }`}
        />
      )}
    </React.Fragment>
  );

  return (
    <div className="flex justify-center items-start mb-12 text-[15px] uppercase">
      {renderStep(1, "Giỏ hàng", "Quản lý danh mục sản phẩm", current === 1, false)}
      {renderStep(
        2,
        "Thanh toán & giao hàng",
        "Thông tin giao nhận & thanh toán",
        current === 2,
        false
      )}
      {renderStep(3, "Xác nhận", "Xem lại và hoàn tất đơn hàng", current === 3, true)}
    </div>
  );
}
