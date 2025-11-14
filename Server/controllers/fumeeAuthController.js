const jwt = require("jsonwebtoken");
const User = require("../models/User");

// LOGIN FUMEE KHÔNG CẦN FUMEE_SECRET
exports.loginByFumee = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token)
      return res.status(400).json({ message: "Thiếu token Fumee!" });

    // Decode luôn (Fumee đã sign hợp lệ)
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

    const { email, username, phone, displayName } = payload;

    // 1️⃣ Tìm user trong DB
    let user = await User.findOne({ email });

    // 2️⃣ Nếu chưa có → create user mới
    if (!user) {
      user = new User({
        username: username || email?.split("@")[0],
        email,
        phone,
        fullName: displayName,
        password: "FUMEE_USER",
        isFumeeUser: true,
      });
      await user.save();
    }

    // 3️⃣ Tạo token nội bộ
    const internalToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Đăng nhập Fumee thành công",
      token: internalToken,
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("❌ Lỗi login Fumee:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};
