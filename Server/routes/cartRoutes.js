// src/routes/cartRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");

router.use(express.json()); // ✅ đảm bảo đọc body JSON

/**
 * ===========================
 * 🟢 LẤY GIỎ HÀNG USER
 * GET /api/cart/:userId
 * ===========================
 */
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ message: "❌ userId không hợp lệ" });

    const user = await User.findById(userId).lean();
    if (!user)
      return res.status(404).json({ message: "❌ Không tìm thấy người dùng" });

    return res.json({ cart: user.cart || [] });
  } catch (err) {
    console.error("❌ Lỗi GET giỏ hàng:", err);
    return res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

/**
 * ===========================
 * 🟡 CẬP NHẬT GIỎ HÀNG USER
 * PUT /api/cart/:userId
 * body: { product, action, items }
 * ===========================
 */
router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { product, action, items } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ message: "❌ userId không hợp lệ" });

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "❌ Không tìm thấy người dùng" });

    if (!user.cart) user.cart = [];

    /**
     * ✅ Khi FE gửi action = "replace"
     * Ta gộp trùng sản phẩm theo (productId + color + size)
     */
    if (action === "replace" && Array.isArray(items)) {
      const merged = [];

      for (const it of items) {
        const exist = merged.find(
          (i) =>
            String(i.productId) === String(it.productId) &&
            i.color === (it.color || "none") &&
            i.size === (it.size || "none")
        );

        if (exist) {
          exist.qty += it.qty || 1;
        } else {
          merged.push({
            productId: it.productId,
            name: it.name,
            price: it.price,
            image: it.image,
            color: it.color || "none",
            size: it.size || "none",
            qty: it.qty || 1,
          });
        }
      }

      user.cart = merged;
      await user.save();
      return res.json({
        message: "✅ Đã cập nhật giỏ hàng (đã gộp trùng)",
        cart: user.cart,
      });
    }

    // 🧩 Các hành động khác: add / increase / decrease / remove
    const idx = user.cart.findIndex(
      (item) =>
        String(item.productId) === String(product.productId) &&
        item.color === (product.color || "none") &&
        item.size === (product.size || "none")
    );

    switch (action) {
      case "add":
        if (idx !== -1) {
          user.cart[idx].qty += product.qty || 1;
        } else {
          const p = await Product.findById(product.productId);
          if (!p)
            return res.status(404).json({ message: "❌ Không tìm thấy sản phẩm" });
          user.cart.push({
            productId: p._id,
            name: p.name,
            price: p.price,
            image: p.image,
            color: product.color || "none",
            size: product.size || "none",
            qty: product.qty || 1,
          });
        }
        break;

      case "increase":
        if (idx !== -1) user.cart[idx].qty += 1;
        break;

      case "decrease":
        if (idx !== -1) {
          user.cart[idx].qty -= 1;
          if (user.cart[idx].qty <= 0) user.cart.splice(idx, 1);
        }
        break;

      case "remove":
        if (idx !== -1) user.cart.splice(idx, 1);
        break;

      default:
        return res.status(400).json({ message: "⚠️ Hành động không hợp lệ" });
    }

    await user.save();
    const updated = await User.findById(userId).lean();
    return res.json({
      message: "✅ Cập nhật giỏ hàng thành công",
      cart: updated.cart,
    });
  } catch (err) {
    console.error("❌ Lỗi PUT giỏ hàng:", err);
    return res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

/**
 * ===========================
 * 🧹 XÓA TOÀN BỘ GIỎ HÀNG
 * DELETE /api/cart/:userId/clear
 * ===========================
 */
router.delete("/:userId/clear", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ message: "❌ userId không hợp lệ" });

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "❌ Không tìm thấy người dùng" });

    user.cart = [];
    await user.save();

    return res.json({ message: "🗑️ Đã xóa toàn bộ giỏ hàng", cart: [] });
  } catch (err) {
    console.error("❌ Lỗi DELETE giỏ hàng:", err);
    return res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

module.exports = router;
