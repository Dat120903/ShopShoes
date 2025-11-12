const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    // 🛍️ Danh sách sản phẩm
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        qty: Number,
        color: String, // 🎨 màu sắc
        size: String,  // 📏 kích cỡ
        image: String,
      },
    ],

    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },

    subtotal: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },

    // 💸 Thông tin mã giảm giá
    discountCode: { type: String, default: "" },
    discountRate: { type: Number, default: 0 },
    discountValue: { type: Number, default: 0 },

    paymentMethod: {
      type: String,
      enum: ["COD", "bank"],
      default: "COD",
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "shipping", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

orderSchema.virtual("customerName").get(function () {
  if (this.populated("user") && this.user?.username) {
    return this.user.username;
  }
  return this.shippingAddress?.fullName || "Ẩn danh";
});

module.exports = mongoose.model("Order", orderSchema);
