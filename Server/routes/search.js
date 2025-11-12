const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// 🧩 Hàm bỏ dấu tiếng Việt
function removeVietnameseTones(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

// GET /api/search?q=...
router.get("/", async (req, res) => {
  try {
    const q = (req.query.q || "").trim();
    if (!q) return res.json({ items: [] });

    // bỏ dấu + regex tìm gần đúng
    const normalizedQ = removeVietnameseTones(q);
    const regex = new RegExp(normalizedQ.split(" ").join(".*"), "i");

    // Lấy tất cả, lọc thủ công theo tên đã bỏ dấu
    const allProducts = await Product.find().select(
      "name price oldPrice discount image images category"
    );

    const filtered = allProducts.filter((p) => {
      const name = removeVietnameseTones(p.name || "");
      const category = removeVietnameseTones(p.category || "");
      const tags = (p.tags || []).map(removeVietnameseTones).join(" ");
      return (
        regex.test(name) || regex.test(category) || regex.test(tags)
      );
    });

    res.json({ items: filtered.slice(0, 12) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
