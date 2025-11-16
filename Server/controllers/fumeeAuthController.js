const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.fumeeLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Thiếu token Fumee" });

    // Giải mã token Fumee
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.sub)
      return res.status(400).json({ message: "Token Fumee không hợp lệ" });

    const fumeeId = decoded.sub; // ID người dùng trong Fumee

    // Tìm user nếu đã tồn tại
    let user = await User.findOne({ fumeeId });

    // Nếu chưa có → tạo user mới trong MongoDB
    if (!user) {
      user = await User.create({
        username: decoded.displayName || `fumee_${fumeeId}`,
        fumeeId,
        email: decoded.email || "",
        phone: decoded.phone || "",
        role: "user",
      });
    }

    // Tạo JWT local
    const localToken = jwt.sign(
      { id: user._id, role: user.role },
      "secret_jwt_key",
      { expiresIn: "7d" }
    );

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
