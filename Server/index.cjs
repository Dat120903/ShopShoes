const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db");

// ROUTES
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const searchRoute = require("./routes/search");
const authRoutes = require("./routes/authRoutes");   // CHỈ DÙNG CÁI NÀY
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const adminStatsRoutes = require("./routes/adminStats");
const couponRoutes = require("./routes/couponRoutes");

const User = require("./models/User");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

// API
app.use("/api/products", productRoutes);
app.use("/api/search", searchRoute);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/admin", adminStatsRoutes);
app.use("/api/coupons", couponRoutes);

// ADMIN MẶC ĐỊNH
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
      console.log("Đã tạo admin mặc định");
    } else {
      console.log("Admin mặc định đã tồn tại");
    }
  } catch (err) {
    console.error("Lỗi tạo admin:", err);
  }
})();

app.get("/", (req, res) => {
  res.json({ msg: "Server OK" });
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
