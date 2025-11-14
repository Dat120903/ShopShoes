const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
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

// LOGIN
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

// AUTH ME (lấy thông tin user qua token)
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

// WISHLIST GET
exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User không tồn tại" });

    res.json({ wishlist: user.wishlist || [] });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// WISHLIST UPDATE
exports.updateWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const { product } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User không tồn tại" });

    const exists = user.wishlist.some(
      (item) => item.productId.toString() === product.productId
    );

    if (exists) {
      user.wishlist = user.wishlist.filter(
        (item) => item.productId.toString() !== product.productId
      );
    } else {
      user.wishlist.push(product);
    }

    await user.save();
    res.json({ message: "OK", wishlist: user.wishlist });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
};
