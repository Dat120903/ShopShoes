const mongoose = require("mongoose");
const fs = require("fs");
const Product = require("./models/Product");

// ✅ Kết nối MongoDB
mongoose.connect("mongodb://localhost:27017/shoedb")
  .then(async () => {
    console.log("✅ Đã kết nối MongoDB");

    // Đọc file JSON
    const data = JSON.parse(fs.readFileSync("./products.json", "utf-8"));

    // Xoá toàn bộ sản phẩm cũ (tránh trùng)
    await Product.deleteMany({});
    await Product.insertMany(data);

    console.log(`✅ Đã import ${data.length} sản phẩm vào MongoDB`);
    mongoose.connection.close();
  })
  .catch((err) => console.error("❌ Lỗi:", err));
