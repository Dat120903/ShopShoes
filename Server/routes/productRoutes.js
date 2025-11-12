const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Product = require("../models/Product");

console.log("[routes] ✅ productRoutes loaded");

// ===============================
// 🔍 SEARCH nâng cao — theo thứ tự từ trái sang phải
// ===============================
router.get("/search", async (req, res) => {
  try {
    const q = (req.query.q || "").trim().toLowerCase();
    const category = (req.query.category || "").trim().toLowerCase();

    if (!q && !category) {
      const all = await Product.find().sort({ createdAt: 1 });
      return res.json(all);
    }

    // 🧩 Bỏ dấu tiếng Việt
    const normalize = (str = "") =>
      str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .trim();

    // 🧩 Hàm Levenshtein (cho phép sai 1 ký tự)
    const levenshtein = (a, b) => {
      const dp = Array(a.length + 1)
        .fill(null)
        .map(() => Array(b.length + 1).fill(0));
      for (let i = 0; i <= a.length; i++) dp[i][0] = i;
      for (let j = 0; j <= b.length; j++) dp[0][j] = j;
      for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
          const cost = a[i - 1] === b[j - 1] ? 0 : 1;
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1,
            dp[i][j - 1] + 1,
            dp[i - 1][j - 1] + cost
          );
        }
      }
      return dp[a.length][b.length];
    };

    const isFuzzyMatch = (a, b) => {
      const dist = levenshtein(a, b);
      if (a.length <= 3 || b.length <= 3) return dist === 0;
      return dist <= 1;
    };

    const terms = normalize(q).split(/\s+/).filter(Boolean);
    const allProducts = await Product.find();

    const results = allProducts.filter((p) => {
      const name = normalize(p.name || "");
      const cat = normalize(p.category || "");
      const sku = normalize(p.sku || "");
      const tag = normalize(p.tag || "");
      const combined = [name, cat, sku, tag].join(" ").replace(/\s+/g, " ");

      // Nếu lọc theo danh mục
      if (category && !cat.includes(category)) return false;

      // ✅ Theo thứ tự trái → phải
      const pattern = terms.join(".*");
      const regex = new RegExp(pattern, "i");
      if (regex.test(combined)) return true;

      // ✅ Fuzzy match từng từ
      const words = combined.split(/\s+/);
      let index = 0;
      for (const term of terms) {
        const foundIndex = words.findIndex(
          (w, i) => i >= index && (w.includes(term) || isFuzzyMatch(w, term))
        );
        if (foundIndex === -1) return false;
        index = foundIndex + 1;
      }
      return true;
    });

    // ✅ Mới nhất ở cuối
    results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    res.json(results);
  } catch (err) {
    console.error("❌ Lỗi tìm kiếm nâng cao:", err);
    res.status(500).json({ message: "Lỗi khi tìm kiếm sản phẩm" });
  }
});

// ===============================
// 🟢 Gợi ý ngẫu nhiên 4 sản phẩm khác
// ===============================
router.get("/recommend/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }

    const excludeId = new mongoose.Types.ObjectId(id);
    const random = await Product.aggregate([
      { $match: { _id: { $ne: excludeId } } },
      { $sample: { size: 4 } },
    ]);

    return res.json(random);
  } catch (err) {
    console.error("❌ Lỗi recommend:", err);
    res
      .status(500)
      .json({ message: "Lỗi khi lấy sản phẩm gợi ý", error: err.message });
  }
});

// ===============================
// 🟢 Lấy chi tiết sản phẩm theo ID
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }

    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    res.json(product);
  } catch (err) {
    console.error("❌ Lỗi khi lấy chi tiết sản phẩm:", err);
    res
      .status(500)
      .json({ message: "Lỗi khi lấy chi tiết sản phẩm", error: err.message });
  }
});

// ===============================
// 🟢 Lấy toàn bộ sản phẩm (mới ở cuối)
// ===============================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: 1 });
    res.json(products);
  } catch (err) {
    console.error("❌ Lỗi khi lấy danh sách sản phẩm:", err);
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách sản phẩm", error: err.message });
  }
});

// ===============================
// 🔵 Thêm mới sản phẩm
// ===============================
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("❌ Lỗi khi thêm sản phẩm:", err);
    res
      .status(500)
      .json({ message: "Lỗi khi thêm sản phẩm", error: err.message });
  }
});

// ===============================
// 🟠 Cập nhật sản phẩm
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }

    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    res.json({
      message: "✅ Cập nhật sản phẩm thành công!",
      product: updated,
    });
  } catch (err) {
    console.error("❌ Lỗi khi cập nhật sản phẩm:", err);
    res.status(500).json({
      message: "Lỗi khi cập nhật sản phẩm",
      error: err.message,
    });
  }
});

// ===============================
// 🔴 Xóa sản phẩm
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    res.json({ message: "🗑️ Đã xóa sản phẩm thành công!" });
  } catch (err) {
    console.error("❌ Lỗi khi xóa sản phẩm:", err);
    res.status(500).json({
      message: "Lỗi khi xóa sản phẩm",
      error: err.message,
    });
  }
});

module.exports = router;
