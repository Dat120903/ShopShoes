const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// 🧠 Đăng nhập admin
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await User.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Tài khoản không tồn tại" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ message: "Sai mật khẩu" });

    if (admin.role !== "admin")
      return res.status(403).json({ message: "Bạn không có quyền truy cập admin" });

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET || "supersecretkey123", // ✅ fallback để tránh undefined
      { expiresIn: "7d" }
    );

    res.json({
      message: "Đăng nhập admin thành công!",
      token,
      user: { id: admin._id, username: admin.username, role: admin.role },
    });
  } catch (err) {
    console.error("❌ Lỗi /admin/login:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

module.exports = router;
