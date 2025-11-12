const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");

// 🟢 Lấy tất cả mã
router.get("/", async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

// 🟢 Tạo mã mới
router.post("/", async (req, res) => {
  try {
    const { code, discountType, value, minOrder, expiresAt } = req.body;
    const coupon = new Coupon({
      code: code.trim().toUpperCase(),
      discountType,
      value,
      minOrder: Number(minOrder) || 0,
      expiresAt,
    });
    await coupon.save();
    res.status(201).json(coupon);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

// 🟡 Kiểm tra mã hợp lệ (CHỈNH CHUẨN)
router.post("/check", async (req, res) => {
  try {
    let { code, total } = req.body;
    if (!code) return res.status(400).json({ valid: false, message: "Thiếu mã" });

    code = code.trim().toUpperCase();
    total = Number(total) || 0;

    const coupon = await Coupon.findOne({ code });
    if (!coupon)
      return res.status(404).json({ valid: false, message: "Mã không tồn tại" });

    if (new Date(coupon.expiresAt) < new Date())
      return res.status(400).json({ valid: false, message: "Mã đã hết hạn" });

    if (total < coupon.minOrder)
      return res.status(400).json({
        valid: false,
        message: `Đơn tối thiểu ${coupon.minOrder.toLocaleString()}₫`,
      });

    // ✅ Tính giảm giá
    let discountRate = 0;
    let discountValue = 0;
    if (coupon.discountType === "percent") {
      discountRate = coupon.value / 100; // ví dụ 20 → 0.2
      discountValue = Math.floor(total * discountRate);
    } else if (coupon.discountType === "fixed") {
      discountRate = 0;
      discountValue = Math.min(coupon.value, total);
    }

    res.json({
      valid: true,
      code: coupon.code,
      discountRate,
      discountValue,
      message: "Áp dụng mã thành công!",
    });
  } catch (err) {
    console.error("❌ Lỗi kiểm tra mã:", err);
    res.status(500).json({ valid: false, message: "Lỗi server" });
  }
});

// 🗑️ Xóa mã
router.delete("/:id", async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa mã" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router;
