// controllers/wishlistController.js
const User = require("../models/User");

// ============================
// 🟢 LẤY WISHLIST
// ============================
exports.getWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user)
      return res.status(404).json({ message: "Không tìm thấy user" });

    res.json({ wishlist: user.wishlist || [] });
  } catch (err) {
    console.error("❌ getWishlist error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ============================
// 🟢 CẬP NHẬT WISHLIST (TOGGLE)
// ============================
exports.updateWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const { product } = req.body;

    if (!product || !product.productId)
      return res.status(400).json({ message: "Thiếu productId" });

    const user = await User.findById(id);

    if (!user)
      return res.status(404).json({ message: "Không tìm thấy user" });

    if (!Array.isArray(user.wishlist)) user.wishlist = [];

    const index = user.wishlist.findIndex(
      (item) => item.productId === product.productId
    );

    if (index > -1) {
      // ❌ Nếu có → xóa
      user.wishlist.splice(index, 1);
    } else {
      // ➕ Nếu chưa có → thêm
      user.wishlist.push(product);
    }

    await user.save();

    res.json({ wishlist: user.wishlist });
  } catch (err) {
    console.error("❌ updateWishlist error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
