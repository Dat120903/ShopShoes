// routes/adminStats.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

// 📊 API thống kê cho Dashboard
router.get("/stats", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();

    console.log("📊 Dashboard Stats:", { totalProducts, totalOrders, totalUsers });
    res.json({ totalProducts, totalOrders, totalUsers });
  } catch (err) {
    console.error("❌ Lỗi thống kê:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

module.exports = router;
