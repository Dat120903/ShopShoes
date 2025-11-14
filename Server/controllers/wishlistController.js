const User = require("../models/User");

// Lấy wishlist
exports.getWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User không tồn tại" });

    res.json({ wishlist: user.wishlist || [] });
  } catch (err) {
    console.error("❌ getWishlist:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Cập nhật wishlist
exports.updateWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const { product } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User không tồn tại" });

    if (!user.wishlist) user.wishlist = [];

    const exists = user.wishlist.find(
      (p) => p.productId === product.productId
    );

    if (exists) {
      // Xóa
      user.wishlist = user.wishlist.filter(
        (p) => p.productId !== product.productId
      );
    } else {
      // Thêm
      user.wishlist.push(product);
    }

    await user.save();
    res.json({ wishlist: user.wishlist });
  } catch (err) {
    console.error("❌ updateWishlist:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
