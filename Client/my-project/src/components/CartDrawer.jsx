import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartProvider.jsx";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const {
    cartItems = [],
    isCartOpen,
    setIsCartOpen,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const navigate = useNavigate();

  // 🧮 Tổng tiền
  const total = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.qty || 1),
    0
  );

  // 🆔 Sinh ID duy nhất cho mỗi dòng
  const getLineId = (it) =>
    it.lineId ||
    `${it._id || it.id}__${it.color || "none"}__${it.size || "none"}`;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-[2147483640]" // 🔥 cao hơn Navbar
            onClick={() => setIsCartOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-0 right-0 h-full w-[380px] bg-white shadow-2xl z-[2147483647] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h2 className="text-[18px] font-bold uppercase tracking-wide">
                Giỏ hàng ({cartItems.length})
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 hover:rotate-90 transition-transform"
              >
                <X className="w-5 h-5 text-gray-600 hover:text-black transition" />
              </button>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="p-5 pr-[12px] overflow-y-auto flex-1">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">
                  Giỏ hàng của bạn đang trống.
                </p>
              ) : (
                cartItems.map((item) => {
                  const lineId = getLineId(item);
                  return (
                    <motion.div
                      key={lineId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-4 border-b border-gray-200 pb-4 mb-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[70px] h-[80px] object-cover rounded-sm border border-gray-100"
                      />

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[15px] text-[#111] truncate">
                          {item.name}
                        </p>
                        <p className="text-[13px] text-gray-500">
                          Color: {item.color || "N/A"} | Size:{" "}
                          {item.size || "—"}
                        </p>

                        {/* Bộ điều chỉnh số lượng */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => decreaseQty(lineId)}
                            className="w-6 h-6 border border-gray-300 flex items-center justify-center hover:bg-gray-100 select-none"
                          >
                            −
                          </button>
                          <span className="min-w-[24px] text-center text-[14px]">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => increaseQty(lineId)}
                            className="w-6 h-6 border border-gray-300 flex items-center justify-center hover:bg-gray-100 select-none"
                          >
                            +
                          </button>
                        </div>

                        <p className="text-[15px] font-semibold text-[#d6001c] mt-2">
                          {(item.price * item.qty).toLocaleString("vi-VN")}₫
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(lineId)}
                        className="ml-1 p-1 text-gray-400 hover:text-red-600 transition flex-shrink-0"
                        title="Xóa sản phẩm"
                      >
                        <X size={18} />
                      </button>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 bg-white px-5 py-4 shadow-inner">
                <div className="flex justify-between text-[15px] font-medium mb-3">
                  <span>Tổng giá trị:</span>
                  <span className="text-[#d6001c] font-semibold">
                    {total.toLocaleString("vi-VN")}₫
                  </span>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate("/cart");
                  }}
                  className="w-full bg-gray-100 text-[#111] py-2.5 mb-2 uppercase text-[13px] font-semibold hover:bg-gray-200 hover:scale-[1.02] transition-all duration-300"
                >
                  Xem toàn bộ giỏ hàng
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate("/checkout");
                  }}
                  className="w-full bg-[#111] text-white py-3 uppercase text-[13px] font-semibold hover:bg-black hover:scale-[1.02] transition-all duration-300"
                >
                  Mua hàng & Thanh toán
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
