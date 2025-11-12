import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AccountSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const linkClasses = (path) =>
    currentPath === path
      ? "text-[#0b6e6a] font-semibold border-l-4 border-[#f4c400] pl-3"
      : "hover:text-[#0b6e6a] transition cursor-pointer";

  return (
    <aside className="w-full md:w-[250px] border-r border-gray-300">
      <ul className="space-y-5 text-[18px] font-medium text-gray-800 leading-relaxed">
        <li className={linkClasses("/account")} onClick={() => navigate("/account")}>
          Tổng quan
        </li>
        <li className={linkClasses("/orders")} onClick={() => navigate("/orders")}>
          Đơn hàng
        </li>
        <li
          className={linkClasses("/account-details")}
          onClick={() => navigate("/account-details")}
        >
          Chi tiết tài khoản
        </li>
        <li className={linkClasses("/wishlist")} onClick={() => navigate("/wishlist")}>
          Mục yêu thích
        </li>
        <li
          className="text-red-600 hover:text-red-700 cursor-pointer"
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Đăng xuất
        </li>
      </ul>
    </aside>
  );
};

export default AccountSidebar;
