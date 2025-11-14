const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ========================
// 📌 Đăng ký
// ========================
exports.register = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    // 🔹 Kiểm tra nhập đủ
    if (!username || !password || !confirmPassword) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin." });
    }

    // 🔹 Kiểm tra độ dài username
    if (username.length < 6) {
      return res.status(400).json({ message: "Tên tài khoản phải có ít nhất 6 ký tự." });
    }

    // 🔹 Kiểm tra mật khẩu xác nhận
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Mật khẩu xác nhận không khớp." });
    }

    // 🔹 Kiểm tra mật khẩu mạnh
    const strongPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).{8,}$/;
    if (!strongPassword.test(password)) {
      return res.status(400).json({
        message:
          "Mật khẩu phải có ít nhất 8 ký tự, bao gồm 1 chữ in hoa, 1 số và 1 ký tự đặc biệt.",
      });
    }

    // 🔹 Kiểm tra trùng username
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại." });

    // ✅ Lưu user
    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashed });
    await newUser.save();

    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (err) {
    console.error("❌ Lỗi register:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ========================
// 📌 Đăng nhập
// ========================
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Tài khoản không tồn tại." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Mật khẩu không đúng." });

    // ✅ Thêm role nếu chưa có
    if (!user.role) {
      user.role = username === "admin" ? "admin" : "user";
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      "secret_jwt_key",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Đăng nhập thành công!",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ Lỗi login:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ========================
// 📦 Lấy thông tin người dùng
// ========================
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// ========================
// 🧩 Cập nhật hồ sơ người dùng
// ========================
exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, phone, email, username, oldPassword, newPassword } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

    // 🔒 Nếu đổi mật khẩu
    if (newPassword && newPassword.trim() !== "") {
      if (!oldPassword)
        return res.status(400).json({ message: "Vui lòng nhập mật khẩu cũ để đổi mật khẩu" });

      const match = await bcrypt.compare(oldPassword, user.password);
      if (!match)
        return res.status(400).json({ message: "Mật khẩu cũ không đúng" });

      const strongPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).{8,}$/;
      if (!strongPassword.test(newPassword)) {
        return res.status(400).json({
          message:
            "Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm 1 chữ in hoa, 1 số và 1 ký tự đặc biệt.",
        });
      }

      user.password = await bcrypt.hash(newPassword, 10);
    }

    if (fullName !== undefined) user.fullName = fullName;
    if (phone !== undefined) user.phone = phone;
    if (email !== undefined) user.email = email;
    if (username !== undefined) user.username = username;

    await user.save();

    res.json({
      message: "Cập nhật thông tin thành công!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("❌ Lỗi updateProfile:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// ========================
// 💖 Wishlist
// ========================
exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User không tồn tại" });
    res.json({ wishlist: user.wishlist || [] });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

exports.updateWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { product } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User không tồn tại" });

    const exists = user.wishlist.some(
      (item) =>
        item.productId?.toString() === product.productId.toString()
    );

    if (exists) {
      user.wishlist = user.wishlist.filter(
        (item) =>
          item.productId?.toString() !== product.productId.toString()
      );
    } else {
      user.wishlist.push({
        productId: product.productId,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    }

    await user.save();

    res.json({
      message: "Cập nhật wishlist thành công",
      wishlist: user.wishlist,
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};


// ========================
// 🛒 Giỏ hàng
// ========================
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User không tồn tại" });
    res.json({ cart: user.cart || [] });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { product, action } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User không tồn tại" });
    if (!user.cart) user.cart = [];

    const pid = product.productId?.toString();
    const idx = user.cart.findIndex((item) => item.productId?.toString() === pid);

    switch (action) {
      case "add":
        if (idx !== -1) user.cart[idx].qty += product.qty || 1;
        else {
          const p = await Product.findById(product.productId);
          if (p) {
            user.cart.push({
              productId: p._id,
              name: p.name,
              price: p.price,
              image: p.image,
              qty: product.qty || 1,
            });
          }
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
        return res.status(400).json({ message: "Hành động không hợp lệ" });
    }

    await user.save();
    res.json({ message: "✅ Cập nhật giỏ hàng thành công", cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};
