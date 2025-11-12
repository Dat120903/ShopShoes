const Order = require("../models/Order");

// 🧾 Tạo đơn hàng mới (Checkout)
exports.createOrder = async (req, res) => {
  try {
    const {
      userId,
      items,
      shippingAddress,
      totalPrice,
      paymentMethod,
      subtotal,
      shippingFee,
      discountCode,
      discountRate,
      discountValue,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Thiếu sản phẩm trong đơn hàng" });
    }

    const orderData = {
      items,
      shippingAddress,
      totalPrice,
      paymentMethod,
      subtotal,
      shippingFee,
      discountCode,
      discountRate,
      discountValue: discountValue || subtotal * (discountRate || 0),
    };

    if (userId) orderData.user = userId;

    const order = new Order(orderData);
    await order.save();

    res.status(201).json({ message: "Đặt hàng thành công!", order });
  } catch (err) {
    console.error("❌ Lỗi createOrder:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// 📦 Lấy danh sách đơn hàng của user
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Lỗi getUserOrders:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// 🧑‍💼 Lấy tất cả đơn hàng (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "username")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Lỗi getAllOrders:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// 🔄 Cập nhật trạng thái đơn hàng (Admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    res.json({ message: "Cập nhật trạng thái thành công", order });
  } catch (err) {
    console.error("❌ Lỗi updateOrderStatus:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// 🔍 Lấy chi tiết đơn hàng
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "username");
    if (!order)
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    res.json(order);
  } catch (err) {
    console.error("❌ Lỗi getOrderById:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};
