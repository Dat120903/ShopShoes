const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User"); // model user của bạn

// SECRET để tạo JWT nội bộ cho website
const JWT_SECRET = "EVASHOES_SECRET_KEY_123";

// =========================
// 1. ĐĂNG NHẬP BẰNG FUMEE
// =========================
router.post("/fumee-login", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) return res.status(400).json({ message: "Thiếu token Fumee!" });

    // 📌 Giải mã token Fumee (KHÔNG cần secret)
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString("utf8"));

    const { email, phone, username, displayName, sub } = payload;

    if (!email && !phone) {
      return res.status(400).json({ message: "Token Fumee không hợp lệ!" });
    }

    // ==========================
    // 2. Tìm user trong hệ thống
    // ==========================
    let user = await User.findOne({ fumeeId: sub });

    if (!user) {
      // Tìm theo email hoặc phone
      user = await User.findOne({ email }) || await User.findOne({ phone });
    }

    // ==========================
    // 3. Nếu user chưa tồn tại → tạo mới
    // ==========================
    if (!user) {
      user = await User.create({
        username: username || email || `fumee_${sub}`,
        email,
        phone,
        fullName: displayName || username,
        fumeeId: sub,
        password: null, // user Fumee không có mật khẩu nội bộ
        role: "user",
      });
    }

    // ==========================
    // 4. Tạo token nội bộ
    // ==========================
    const internalToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Fumee login thành công!",
      token: internalToken,
      user: {
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("🔥 Lỗi Fumee login:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});


// =========================
// 5. Đăng nhập nội bộ
// =========================
router.post("/login", require("../controllers/authLogin"));


// =========================
// 6. Đăng ký nội bộ
// =========================
router.post("/register", require("../controllers/authRegister"));


// =========================
// 7. Lấy user theo ID
// =========================
router.get("/user/:id", async (req, res) => {
  try {
    const u = await User.findById(req.params.id).select("-password");
    if (!u) return res.status(404).json({ message: "Không tìm thấy user" });
    res.json(u);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router;
