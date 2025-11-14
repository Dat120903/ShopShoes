import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function LoginDrawer({ isOpen, onClose }) {
  const [isRegister, setIsRegister] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Nhận sự kiện open-login
  useEffect(() => {
    const openLogin = () => {
      setIsRegister(false);
      onClose(false);
    };
    window.addEventListener("open-login", openLogin);
    return () => window.removeEventListener("open-login", openLogin);
  }, []);

  // LOGIN NỘI BỘ
  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target[0].value.trim();
    const password = e.target[1].value.trim();

    if (!username || !password)
      return toast.error("Vui lòng nhập đầy đủ thông tin!");

    try {
      const res = await fetch("https://thanhdatshoes.id.vn/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.message || "Đăng nhập thất bại");

      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("storage"));

      await login(data.token);

      toast.success("🎉 Đăng nhập thành công!");
      onClose();

      navigate(data.user.role === "admin" ? "/admin/dashboard" : "/");
    } catch (err) {
      console.error("❌ Lỗi đăng nhập:", err);
      toast.error("Không thể kết nối đến server!");
    }
  };

  // ĐĂNG KÝ
  const handleRegister = async (e) => {
    e.preventDefault();
    const username = e.target[0].value.trim();
    const password = e.target[1].value.trim();
    const confirmPassword = e.target[2].value.trim();

    if (!username || !password || !confirmPassword)
      return toast.error("Vui lòng nhập đầy đủ thông tin");

    try {
      const res = await fetch("https://thanhdatshoes.id.vn/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, confirmPassword }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success("🎉 Đăng ký thành công! Vui lòng đăng nhập.");
      setIsRegister(false);
      e.target.reset();
    } catch (err) {
      console.error("❌ Lỗi đăng ký:", err);
      toast.error("Không thể kết nối server!");
    }
  };

  // LOGIN FUMEE
  const handleFumeeLogin = () => {
    window.location.href =
      "https://id.fumeesoft.com/?url_callback=https://thanhdatshoes.id.vn";
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-[10000]"
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[420px] bg-white shadow-lg z-[10001] transform transition-transform duration-300 ${
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
                <form className="space-y-5" onSubmit={handleLogin}>
                  <input
                    type="text"
                    placeholder="Tên đăng nhập *"
                    className="w-full border px-3 py-4"
                  />
                  <input
                    type="password"
                    placeholder="Mật khẩu *"
                    className="w-full border px-3 py-4"
                  />

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-5 font-semibold"
                  >
                    Đăng nhập
                  </button>
                </form>

                <div className="flex items-center gap-3 my-6">
                  <span className="flex-1 h-px bg-gray-300" />
                  <span className="text-gray-500 text-sm">Hoặc</span>
                  <span className="flex-1 h-px bg-gray-300" />
                </div>

                <button
                  onClick={handleFumeeLogin}
                  className="w-full py-3 bg-[#D6001C] text-white font-semibold rounded-md"
                >
                  Đăng nhập qua Fumee
                </button>

                <p className="text-center text-sm mt-6 text-gray-700">
                  Bạn chưa có tài khoản?{" "}
                  <button
                    onClick={() => setIsRegister(true)}
                    className="underline"
                  >
                    Tạo tài khoản ngay
                  </button>
                </p>
              </>
            ) : (
              <>
                <form className="space-y-5" onSubmit={handleRegister}>
                  <input className="w-full border px-3 py-4" placeholder="Tên đăng nhập *" />
                  <input className="w-full border px-3 py-4" placeholder="Mật khẩu *" type="password" />
                  <input className="w-full border px-3 py-4" placeholder="Xác nhận mật khẩu *" type="password" />

                  <p className="text-[13px] text-gray-600">
                    Mật khẩu ≥ 8 ký tự, có in hoa, số & ký tự đặc biệt.
                  </p>

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 font-semibold"
                  >
                    Đăng ký
                  </button>
                </form>

                <p className="text-center text-sm mt-6 text-gray-700">
                  Đã có tài khoản?{" "}
                  <button
                    onClick={() => setIsRegister(false)}
                    className="underline"
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
