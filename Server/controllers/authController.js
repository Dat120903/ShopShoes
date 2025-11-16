const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ========================
// REGISTER
// ========================
exports.register = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    if (!username || !password || !confirmPassword)
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin." });

    if (username.length < 6)
      return res.status(400).json({ message: "Tên tài khoản phải ≥ 6 ký tự." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Mật khẩu xác nhận không khớp." });

    const strongPassword =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).{8,}$/;

    if (!strongPassword.test(password))
      return res.status(400).json({
        message: "Mật khẩu ≥ 8 ký tự, 1 chữ hoa, 1 số và 1 ký tự đặc biệt.",
      });

    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ message: "Tên đăng nhập đã tồn tại." });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashed,
      role: "user",
    });

    await newUser.save();
    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ========================
// LOGIN
// ========================
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user)
      return res.status(400).json({ message: "Tài khoản không tồn tại." });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Mật khẩu không đúng." });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secret_jwt_key",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Đăng nhập thành công!",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ========================
// AUTH ME
// ========================
exports.me = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Thiếu token" });

    const decoded = jwt.verify(token, "secret_jwt_key");
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ========================
// CART GET
// ========================
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User không tồn tại" });

    res.json({ cart: user.cart || [] });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ========================
// CART UPDATE
// ========================
exports.updateCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { product, action } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User không tồn tại" });

    if (!user.cart) user.cart = [];

    const pid = product.productId.toString();
    const idx = user.cart.findIndex((item) => item.productId.toString() === pid);

    switch (action) {
      case "add":
        if (idx !== -1) user.cart[idx].qty += 1;
        else user.cart.push({ ...product, qty: 1 });
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
        user.cart = user.cart.filter((item) => item.productId.toString() !== pid);
        break;

      default:
        return res.status(400).json({ message: "Hành động không hợp lệ" });
    }

    await user.save();
    res.json({ message: "OK", cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
