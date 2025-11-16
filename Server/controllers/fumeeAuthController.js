// controllers/fumeeAuthController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// 🔐 Login bằng Fumee
exports.fumeeLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Thiếu token Fumee" });
    }

    // 🧩 Giải mã token Fumee (chỉ decode, KHÔNG verify vì không có secret Fumee)
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.sub) {
      return res.status(400).json({ message: "Token Fumee không hợp lệ" });
    }

    const fumeeId = decoded.sub; // ID user bên hệ thống Fumee

    // console.log("🔎 Fumee decoded:", decoded);

    // 🔍 Tìm user theo fumeeId (nếu đã từng login Fumee trước đó)
    let user = await User.findOne({ fumeeId });

    // ❗ Nếu chưa tồn tại → tạo mới user LOCAL trong Mongo
    if (!user) {
      user = await User.create({
        username: decoded.displayName || `fumee_${fumeeId}`,
        fumeeId, // lưu lại để lần sau tìm tiếp
        email: decoded.email || "",
        phone: decoded.phone || "",
        role: "user",
      });
    }

    // 🔑 Tạo JWT LOCAL (dùng chung với login thường)
    const localToken = jwt.sign(
      { id: user._id, role: user.role },
      "secret_jwt_key",
      { expiresIn: "7d" }
    );

    // Trả về cho FE:
    //  - token LOCAL (dùng cho /auth/me, v.v…)
    //  - user có _id là ObjectId của Mongo
    return res.json({
      message: "Fumee Login OK",
      token: localToken,
      user,
    });
  } catch (err) {
    console.error("Fumee login error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
