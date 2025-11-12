const mongoose = require("mongoose");

// Giỏ hàng
const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: String,
    price: Number,
    image: String,
    color: { type: String, default: "none" },
    size: { type: String, default: "none" },
    qty: { type: Number, default: 1 },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String },
    role: { type: String, default: "user" },
    fullName: { type: String }, // ✅ để ở đây (cấp gốc user)
    phone: { type: String },    // ✅ để ở đây
    wishlist: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        image: String,
        category: String,
      },
    ],
    cart: [cartItemSchema], // 🛒 danh sách sản phẩm trong giỏ hàng
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
