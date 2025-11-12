import React, { useState, useEffect } from "react";
import AccountSidebar from "../../components/AccountSidebar";

const AccountDetails = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    username: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // ✅ Lấy thông tin người dùng từ server
  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:5000/api/auth/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          fullName: data.fullName || "",
          phone: data.phone || "",
          email: data.email || "",
          username: data.username || "",
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      })
      .catch((err) => console.error("Lỗi lấy thông tin người dùng:", err));
  }, [userId]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Cập nhật thông tin
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // 1️⃣ Nếu có đổi mật khẩu
    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword)
        return alert("Mật khẩu xác nhận không khớp!");

      const resPass = await fetch(`http://localhost:5000/api/users/change-password/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });
      const dataPass = await resPass.json();
      if (!resPass.ok) return alert(dataPass.message || "Đổi mật khẩu thất bại!");
      alert("✅ Đổi mật khẩu thành công!");
    }

    // 2️⃣ Cập nhật họ tên / sđt / email
    const res = await fetch(`http://localhost:5000/api/users/update-info/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
      }),
    });

    const data = await res.json();
    res.ok
      ? alert("✅ Cập nhật thông tin cá nhân thành công!")
      : alert(data.message || "Cập nhật thất bại!");
  } catch (err) {
    alert("Lỗi kết nối server!");
  }
};


  return (
    <section className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8 mt-[120px] min-h-[70vh]">
      <h1 className="text-[32px] font-bold uppercase mb-10">
        THÔNG TIN TÀI KHOẢN
      </h1>

      <div className="flex flex-col md:flex-row gap-10 text-[16px] leading-relaxed text-gray-800">
        {/* ✅ Sidebar dùng chung */}
        <AccountSidebar className="relative z-10" />

        {/* ✅ Form chỉnh sửa thông tin */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-6">
          {/* Thông tin cá nhân */}
          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              name="fullName"
              placeholder="Họ và tên"
              value={formData.fullName}
              onChange={handleChange}
              className="border border-gray-300 px-3.5 py-2.5 w-full"
            />
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 px-3.5 py-2.5 w-full"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 px-3.5 py-2.5 w-full"
            />
            <input
              type="text"
              name="username"
              placeholder="Tên đăng nhập"
              value={formData.username}
              readOnly
              className="border border-gray-300 px-3.5 py-2.5 w-full bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Đổi mật khẩu */}
          <div className="space-y-4 mt-8">
            <h3 className="font-bold uppercase text-[16px]">
              Thay đổi mật khẩu
            </h3>
            <input
              type="password"
              name="oldPassword"
              placeholder="Mật khẩu cũ"
              onChange={handleChange}
              className="border border-gray-300 px-3.5 py-2.5 w-full"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="Mật khẩu mới"
              onChange={handleChange}
              className="border border-gray-300 px-3.5 py-2.5 w-full"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              onChange={handleChange}
              className="border border-gray-300 px-3.5 py-2.5 w-full"
            />
          </div>

          {/* Nút lưu */}
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 uppercase text-[15px] font-semibold hover:bg-gray-800 transition mt-4"
          >
            Lưu thay đổi
          </button>
        </form>
      </div>
    </section>
  );
};

export default AccountDetails;
