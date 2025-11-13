import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartProvider.jsx";
import CheckoutSteps from "../../components/CheckoutSteps";
import provincesData from "../../data/vietnamProvinces.json";
import toast from "react-hot-toast";
import { API_BASE } from "../../config/api";


const fmtVND = (n) => `${Number(n || 0).toLocaleString("vi-VN")}₫`;

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems = [], clearCart } = useCart();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // 🔹 Đọc mã giảm giá đã lưu
  const discountCode = localStorage.getItem("discountCode") || "";
  const discountRate = parseFloat(localStorage.getItem("discountRate") || "0");
  const discountValueStored = parseFloat(localStorage.getItem("discountValue") || "0");
  const discountType = localStorage.getItem("discountType") || "";

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    district: "",
    address: "",
    note: "",
    payment: "bank", // mặc định chuyển khoản
  });

  const [districtList, setDistrictList] = useState([]);
  const [shippingFee, setShippingFee] = useState(0);
  const [loading, setLoading] = useState(false);

  // ✅ Điều hướng & đánh dấu bước
  useEffect(() => {
    if (cartItems.length === 0) navigate("/cart", { replace: true });
    else localStorage.setItem("checkoutProgress", "2");
  }, [cartItems, navigate]);

  // ✅ Lấy thông tin người dùng (auto fill)
  useEffect(() => {
    if (!userId) return;
fetch(`https://thanhdatshoes.id.vn/api/auth/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setForm((prev) => ({
            ...prev,
            fullName: data.fullName || "",
            phone: data.phone || "",
            email: data.email || "",
          }));
        }
      })
      .catch((err) => console.error("❌ Lỗi lấy thông tin user:", err));
  }, [userId, token]);

  // ✅ Tính tổng & giảm giá
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.qty || 1),
    0
  );
  const discountCalc = discountValueStored > 0 ? discountValueStored : subtotal * discountRate;
  const discount = Math.min(discountCalc, subtotal);
  const total = subtotal + shippingFee - discount;

  const minOrder = Number(localStorage.getItem("minOrder") || 0);
  const code = localStorage.getItem("discountCode") || "";

  // ✅ Nếu đơn hàng dưới minOrder thì hủy mã
  useEffect(() => {
    if (code && minOrder > 0 && subtotal < minOrder) {
      toast.error(`Đơn hàng dưới ${minOrder.toLocaleString("vi-VN")}₫ — mã ${code} đã bị hủy.`);
      localStorage.removeItem("discountRate");
      localStorage.removeItem("discountValue");
      localStorage.removeItem("discountCode");
      localStorage.removeItem("discountType");
      localStorage.removeItem("minOrder");
      navigate("/cart");
    }
  }, [subtotal]);

  // ✅ Khi đổi tỉnh / thành phố
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "city") {
      const province = provincesData.find((p) => p.name === value);
      setDistrictList(province ? province.districts : []);
      if (value === "Hà Nội" || value === "TP Hồ Chí Minh") setShippingFee(0);
      else if (value) setShippingFee(30000);
      else setShippingFee(0);
      setForm((prev) => ({ ...prev, district: "" }));
    }
  };

  // ✅ Reset toàn bộ mã giảm giá (khi đặt hàng xong)
  const resetDiscount = () => {
    localStorage.removeItem("discountRate");
    localStorage.removeItem("discountValue");
    localStorage.removeItem("discountCode");
    localStorage.removeItem("discountType");
    localStorage.removeItem("minOrder");
  };

  // ✅ Gửi đơn hàng
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.city || !form.district || !form.address)
      return alert("⚠️ Vui lòng nhập đầy đủ thông tin giao nhận!");

    const orderData = {
      userId: userId || null,
      items: cartItems.map((i) => ({
        productId: i._id || i.id,
        name: i.name,
        price: i.price,
        qty: i.qty,
        color: i.color || "—",
        size: i.size || "—",
        image: i.image,
      })),
      shippingAddress: {
        fullName: form.fullName,
        phone: form.phone,
        address: `${form.address}, ${form.district}, ${form.city}`,
        city: form.city,
      },
      subtotal,
      shippingFee,
      totalPrice: total,
      paymentMethod: form.payment,
      discountCode: discountCode || null,
      discountType: discountType || "",
      discountRate: discountRate || 0,
      discountValue: discount || 0,
      note: form.note,
      contactEmail: form.email,
    };

    try {
      setLoading(true);
const res = await fetch("https://thanhdatshoes.id.vn/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("lastOrder", JSON.stringify(data.order));
        localStorage.setItem("checkoutProgress", "3");
        navigate("/order-confirm");
        setTimeout(() => {
          clearCart();       // 🧹 Xóa giỏ hàng
          resetDiscount();   // 🧩 Xóa mã giảm giá
        }, 800);
      } else {
        alert("⚠️ " + (data.message || "Đặt hàng thất bại!"));
      }
    } catch (err) {
      console.error("❌ Lỗi khi đặt hàng:", err);
      alert("Không thể kết nối đến server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 pt-[130px] pb-24 bg-white"
    >
      <h1 className="text-[30px] font-bold uppercase mb-10">
        Thông tin giao nhận & thanh toán
      </h1>

      <CheckoutSteps current={2} />

      <motion.form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-10">
        {/* === FORM GIAO NHẬN === */}
        <div className="flex-1">
          <h2 className="text-[17px] font-bold uppercase mb-6">Thông tin giao nhận</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <input
              type="text"
              name="fullName"
              placeholder="Họ và tên*"
              value={form.fullName}
              onChange={handleChange}
              className="border-b border-gray-300 focus:border-black outline-none pb-2"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại*"
              value={form.phone}
              onChange={handleChange}
              className="border-b border-gray-300 focus:border-black outline-none pb-2"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className="border-b border-gray-300 pb-2 outline-none"
            >
              <option value="">Tỉnh / Thành phố*</option>
              {provincesData.map((p) => (
                <option key={p.code} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>

            <select
              name="district"
              value={form.district}
              onChange={handleChange}
              required
              disabled={!form.city}
              className="border-b border-gray-300 pb-2 outline-none disabled:text-gray-400"
            >
              <option value="">{form.city ? "Quận / Huyện*" : "Chọn Tỉnh/Thành trước"}</option>
              {districtList.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            name="address"
            placeholder="Địa chỉ đường, số nhà*"
            value={form.address}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:border-black outline-none pb-2 mb-5"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border-b border-gray-300 focus:border-black outline-none pb-2 mb-5"
          />

          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="Lời nhắn hoặc ghi chú thêm cho đơn hàng..."
            rows="4"
            className="w-full border border-gray-300 p-3 text-[14px] outline-none focus:border-black resize-none"
          />

          {/* === PHƯƠNG THỨC THANH TOÁN === */}
          <div className="mt-6">
            <h3 className="text-[16px] font-semibold mb-3">Phương thức thanh toán</h3>

            <div className="flex flex-col gap-3 text-[15px]">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={form.payment === "bank"}
                  onChange={handleChange}
                />
                Chuyển khoản ngân hàng
              </label>
              <div className="ml-6 text-gray-600 text-sm leading-relaxed">
                <p>Công ty Cổ phần Thời trang Evashoes</p>
                <p>Số tài khoản: 22010020087468</p>
                <p>Ngân hàng: BIDV – CN Thăng Long</p>
                <p>
                  Sau khi chuyển tiền, vui lòng liên hệ HOTLINE:{" "}
                  <span className="font-medium">1900 56 56 38</span> để xác nhận.
                </p>
              </div>

              <label className="flex items-center gap-2 mt-3">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={form.payment === "COD"}
                  onChange={handleChange}
                />
                Thanh toán khi nhận hàng (COD)
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="vnpay"
                  checked={form.payment === "vnpay"}
                  onChange={handleChange}
                />
                Thanh toán qua VNPAY
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={form.payment === "card"}
                  onChange={handleChange}
                />
                Visa / MasterCard / JCB
              </label>
            </div>
          </div>
        </div>

        {/* === TỔNG ĐƠN HÀNG === */}
        <div className="w-full lg:w-[380px] border border-gray-300 p-6 h-fit rounded-md shadow-sm">
          <h3 className="text-[17px] font-bold uppercase mb-6">Đơn hàng của bạn</h3>

          {cartItems.map((item, i) => (
            <div key={i} className="flex justify-between text-[14px] mb-2">
              <span>
                {item.name} × {item.qty}
              </span>
              <span>{fmtVND(item.price * item.qty)}</span>
            </div>
          ))}

          <div className="border-t border-gray-200 mt-3 mb-3" />

          <div className="flex justify-between text-[15px] mb-1">
            <span>Giá trị đơn hàng</span>
            <span>{fmtVND(subtotal)}</span>
          </div>

          <div className="flex justify-between text-[15px] mb-1">
            <span>Vận chuyển</span>
            <span>{shippingFee ? fmtVND(shippingFee) : "Miễn phí"}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-[15px] text-green-600 mb-1">
              <span>Mã giảm giá ({discountCode})</span>
              <span>-{fmtVND(discount)}</span>
            </div>
          )}

          <div className="border-t border-gray-200 mt-3 mb-3" />

          <div className="flex justify-between text-[16px] font-semibold">
            <span>Tổng cộng</span>
            <span>{fmtVND(total)}</span>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-black text-white py-3 uppercase text-[14px] font-semibold mt-6 rounded-sm disabled:opacity-60"
          >
            {loading ? "Đang xử lý..." : "Hoàn tất đơn hàng"}
          </motion.button>
        </div>
      </motion.form>
    </motion.section>
  );
}
