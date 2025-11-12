import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast"; // ✅ thêm dòng này

export default function LoginDrawer({ isOpen, onClose }) {
  const [isRegister, setIsRegister] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target[0].value.trim();
    const password = e.target[1].value.trim();

    if (!username || !password)
      return toast.error("Vui lòng nhập đầy đủ thông tin!");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.message || "Đăng nhập thất bại!");

      login(data.token);
      toast.success("🎉 Đăng nhập thành công!");
      onClose();

      const decoded = JSON.parse(atob(data.token.split(".")[1]));
      navigate(decoded.role === "admin" ? "/admin/dashboard" : "/");
    } catch (err) {
      console.error("❌ Lỗi đăng nhập:", err);
      toast.error("Không thể kết nối đến server!");
    }
  };

  const handleRegister = async (e) => {
  e.preventDefault();
  const username = e.target[0].value.trim();
  const password = e.target[1].value.trim();
  const confirmPassword = e.target[2].value.trim();

  if (!username || !password || !confirmPassword)
    return toast.error("Vui lòng nhập đầy đủ thông tin!");

  if (username.length < 6)
    return toast.error("Tên tài khoản phải có ít nhất 6 ký tự!");

  const strongPassword =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).{8,}$/;

  if (!strongPassword.test(password))
    return toast.error(
      "Mật khẩu phải có ít nhất 8 ký tự, bao gồm 1 chữ in hoa, 1 số và 1 ký tự đặc biệt!"
    );

  if (password !== confirmPassword)
    return toast.error("Mật khẩu xác nhận không khớp!");

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, confirmPassword }),
    });

    const data = await res.json();
    if (!res.ok) return toast.error(data.message || "Đăng ký thất bại!");

    // ✅ Reset form và chuyển sang tab đăng nhập
    e.target.reset();
    toast.success("🎉 Đăng ký thành công! Vui lòng đăng nhập lại.");
    setIsRegister(false);
  } catch (err) {
    console.error("❌ Lỗi đăng ký:", err);
    toast.error("Không thể kết nối đến server!");
  }
};


  return (
    <>
      {/* Overlay nền mờ */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-[10000]"
        ></div>
      )}

      {/* Drawer chính */}
      <div
        className={`fixed top-0 right-0 h-full w-[420px] bg-white shadow-lg z-[10001] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-6">
          <h2 className="text-[17px] font-semibold uppercase ml-3">
            {isRegister ? "Tạo tài khoản" : "Đăng nhập"}
          </h2>
          <button
            onClick={() => {
              setIsRegister(false);
              onClose();
            }}
            className="text-gray-500 hover:text-black"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex justify-center">
          <div className="w-[80%] max-w-[360px] mt-10">
            {!isRegister ? (
              <>
                {/* 🔑 FORM ĐĂNG NHẬP */}
                <form className="space-y-5" onSubmit={handleLogin}>
                  <input
                    type="text"
                    placeholder="Tên đăng nhập *"
                    className="w-full border border-gray-300 px-3 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <input
                    type="password"
                    placeholder="Mật khẩu *"
                    className="w-full border border-gray-900 px-3 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-5 font-semibold uppercase text-sm hover:bg-gray-800 transition"
                  >
                    Đăng nhập
                  </button>
                </form>

                <p className="text-center text-sm mt-6 text-gray-700">
                  Bạn chưa có tài khoản?{" "}
                  <button
                    onClick={() => setIsRegister(true)}
                    className="underline text-gray-950 hover:text-black"
                  >
                    Tạo tài khoản ngay
                  </button>
                </p>
              </>
            ) : (
              <>
                {/* 🆕 FORM ĐĂNG KÝ */}
                <form className="space-y-5" onSubmit={handleRegister}>
                  <input
                    type="text"
                    placeholder="Tên đăng nhập *"
                    className="w-full border border-gray-300 px-3 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <input
                    type="password"
                    placeholder="Mật khẩu *"
                    className="w-full border border-gray-300 px-3 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <input
                    type="password"
                    placeholder="Xác nhận mật khẩu *"
                    className="w-full border border-gray-900 px-3 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />

                  <p className="text-[13px] text-gray-600 leading-relaxed mt-2">
                    Mật khẩu cần ít nhất 8 ký tự, có 1 chữ in hoa, 1 số và 1 ký tự đặc biệt.
                  </p>

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 font-semibold uppercase text-sm hover:bg-gray-800 transition"
                  >
                    Đăng ký
                  </button>
                </form>

                <p className="text-center text-sm mt-6 text-gray-700">
                  Đã có tài khoản?{" "}
                  <button
                    onClick={() => setIsRegister(false)}
                    className="underline text-gray-950 hover:text-black"
                  >
                    Đăng nhập ngay
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
