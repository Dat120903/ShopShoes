const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    price: Number,
    oldPrice: Number,
    discount: String,
    tag: String,
    sku: String,
    description: String,
    longDescription: String,
    image: String,
    images: [String],

    // 🔎 Trường phục vụ tìm kiếm không dấu
    searchKey: { type: String, index: true },
  },
  { timestamps: true }
);

// Bỏ dấu TV
function normalizeVN(str = "") {
  return String(str)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

// Tạo searchKey trước khi lưu
productSchema.pre("save", function (next) {
  const text = [
    this.name,
    this.category,
    this.tag,
    this.sku,
    this.description,
  ]
    .filter(Boolean)
    .join(" ");
  this.searchKey = normalizeVN(text);
  next();
});

// Cập nhật searchKey khi update bằng findOneAndUpdate/ findByIdAndUpdate
productSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() || {};
  const fields = ["name", "category", "tag", "sku", "description"];
  // Lấy giá trị mới nếu có, fallback sang $set
  const get = (k) =>
    update[k] ??
    (update.$set ? update.$set[k] : undefined);

  // Nếu user có cập nhật một trong các field liên quan thì build lại searchKey
  let changed = false;
  const buf = [];

  fields.forEach((k) => {
    const v = get(k);
    if (typeof v !== "undefined") changed = true;
  });

  if (changed) {
    fields.forEach((k) => {
      const v = get(k);
      if (typeof v !== "undefined") buf.push(v);
    });
    const newKey = normalizeVN(buf.join(" "));
    if (!update.$set) update.$set = {};
    update.$set.searchKey = newKey;
    this.setUpdate(update);
  }

  next();
});

module.exports = mongoose.model("Product", productSchema);

