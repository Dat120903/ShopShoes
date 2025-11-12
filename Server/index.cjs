const express = require("express");
const cors = require("cors");
require("dotenv").config(); // ✅ nạp biến môi trường
require("./db"); // ✅ Kết nối MongoDB

// 🧩 Import routes
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const searchRoute = require("./routes/search");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const adminStatsRoutes = require("./routes/adminStats");
const couponRoutes = require("./routes/couponRoutes");

// 🧩 Models
const User = require("./models/User");
const bcrypt = require("bcryptjs");

const app = express();

// 🧠 Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ hỗ trợ form-urlencoded nếu sau này dùng

const PORT = process.env.PORT || 5000;

// ================================
// 📦 ROUTES
// ================================
app.use("/api/products", productRoutes);
app.use("/api/search", searchRoute);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/admin", adminStatsRoutes);
app.use("/api/coupons", couponRoutes); // ✅ route mã giảm giá

// ================================
// 🧩 Tạo admin mặc định (chạy 1 lần duy nhất)
// ================================
(async () => {
  try {
    const adminExists = await User.findOne({ username: "admin" });
    if (!adminExists) {
      const hashed = await bcrypt.hash("123456", 10);
      await User.create({
        username: "admin",
        password: hashed,
        role: "admin",
      });
      console.log("✅ Đã tạo admin mặc định (admin / 123456)");
    } else {
      console.log("ℹ️ Admin mặc định đã tồn tại.");
    }
  } catch (err) {
    console.error("❌ Lỗi khi tạo admin mặc định:", err);
  }
})();

// ================================
// 🧩 Test API
// ================================
app.get("/", (req, res) => {
  res.json({ message: "✅ ShoeServer + MongoDB đang hoạt động!" });
});

// ================================
// 🚀 Khởi động server
// ================================
app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
