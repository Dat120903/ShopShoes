const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.fumeeLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Thiếu token Fumee" });

    // Giải mã token Fumee (không verify vì token Fumee không dùng secret của mình)
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.sub)
      return res.status(400).json({ message: "Token Fumee không hợp lệ" });

    const fumeeId = decoded.sub; // ID người dùng trong Fumee

    // ================================
    // 🔍 TÌM USER TRONG MONGODB
    // ================================
    let user = await User.findOne({ fumeeId });

    // Nếu chưa có → tạo user mới
    if (!user) {
      user = await User.create({
        username: decoded.displayName || `fumee_${fumeeId}`,
        fumeeId,
        email: decoded.email || "",
        phone: decoded.phone || "",
        role: "user",
      });
    }

    // ================================
    // 🔐 TẠO JWT LOCAL CHO WEBSITE
    // ================================
    const localToken = jwt.sign(
      { id: user._id, role: user.role },
      "secret_jwt_key",
      { expiresIn: "7d" }
    );

    // ================================
    // 🔥 TRẢ VỀ USER ĐẦY ĐỦ & ĐÚNG
    // ================================
    return res.json({
      message: "Fumee Login OK",
      token: localToken,
      user: {
        _id: user._id,
        username: user.username,
        displayName: decoded.displayName || user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("Fumee login error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
