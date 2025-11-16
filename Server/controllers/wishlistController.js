const User = require("../models/User");

exports.getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user)
      return res.status(404).json({ message: "Không tìm thấy user" });

    return res.json({ wishlist: user.wishlist || [] });
  } catch (err) {
    return res.status(500).json({ message: "Lỗi server" });
  }
};

exports.updateWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { product } = req.body;

    if (!product || !product.productId)
      return res.status(400).json({ message: "Thiếu productId" });

    const user = await User.findById(userId);

    if (!user)
      return res.status(404).json({ message: "Không tìm thấy user" });

    if (!Array.isArray(user.wishlist)) user.wishlist = [];

    const index = user.wishlist.findIndex(
      (item) => item.productId === product.productId
    );

    if (index >= 0) {
      user.wishlist.splice(index, 1);
    } else {
      user.wishlist.push(product);
    }

    await user.save();
    return res.json({ wishlist: user.wishlist });
  } catch (err) {
    return res.status(500).json({ message: "Lỗi server" });
  }
};
