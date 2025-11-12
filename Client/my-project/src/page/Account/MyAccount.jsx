import React from "react";
import { useNavigate } from "react-router-dom";
import AccountSidebar from "../../components/AccountSidebar";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartProvider.jsx";

const MyAccount = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { clearLocalCart } = useCart(); // ✅ chỉ xoá giỏ FE khi logout

  const handleLogout = async () => {
    try {
      // 🔹 Gọi hàm logout từ AuthContext (xóa token, user info)
      await logout();

      // 🔹 Xóa dữ liệu phụ trong localStorage
      [
        "userId",
        "token",
        "username",
        "discountCode",
        "discountRate",
        "discountValue",
        "discountType",
        "checkoutProgress",
        "lastOrder",
      ].forEach((key) => localStorage.removeItem(key));

      // 🔹 Xóa giỏ hàng ở FE
      clearLocalCart?.();

      // 🔹 Gửi sự kiện để sync giữa các tab (nếu có)
      window.dispatchEvent(new Event("storage"));

      // 🔹 Quay về trang chủ
      navigate("/", { replace: true });
    } catch (err) {
      console.error("❌ Lỗi khi đăng xuất:", err);
    }
  };

  return (
    <section className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8 mt-[120px] min-h-[70vh]">
      <h1 className="text-[32px] font-bold uppercase mb-10">TÀI KHOẢN CỦA TÔI</h1>

      <div className="flex flex-col md:flex-row gap-10 text-[16px] text-gray-700 leading-relaxed">
        <AccountSidebar />

        <div className="flex-1">
          <p>
            Xin chào{" "}
            <span className="font-bold text-black">
              {user?.username || "Người dùng"}
            </span>{" "}
            (không phải{" "}
            <span className="font-bold text-black">
              {user?.username || "Người dùng"}
            </span>
            ?{" "}
            <button
              onClick={handleLogout}
              className="text-blue-600 underline hover:text-blue-800"
            >
              Đăng xuất
            </button>
            )
          </p>

          <p className="mt-6">
            Từ trang quản lý tài khoản, bạn có thể xem{" "}
            <span
              className="underline cursor-pointer text-[#0b6e6a] hover:text-[#095a56]"
              onClick={() => navigate("/orders")}
            >
              đơn hàng gần đây
            </span>
            , quản lý{" "}
            <span
              className="underline text-[#0b6e6a] hover:text-[#095a56] cursor-pointer"
              onClick={() => navigate("/wishlist")}
            >
              mục yêu thích
            </span>{" "}
            và{" "}
            <span
              className="underline cursor-pointer text-[#0b6e6a] hover:text-[#095a56]"
              onClick={() => navigate("/account-details")}
            >
              chỉnh sửa thông tin tài khoản
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
