const User = require("../models/User");
const bcrypt = require("bcryptjs");

// 🟢 Lấy danh sách tất cả user (chỉ admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error("❌ getAllUsers:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ➕ Thêm user mới (Admin)
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role, fullName, phone } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Thiếu username hoặc password" });

    const exist = await User.findOne({ username });
    if (exist) return res.status(400).json({ message: "Username đã tồn tại" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashed, role, fullName, phone });
    await newUser.save();

    res.status(201).json({ message: "Tạo user thành công", user: newUser });
  } catch (err) {
    console.error("❌ createUser:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ✏️ Cập nhật user (Admin)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role, fullName, phone } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { username, email, role, fullName, phone },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });

    res.json({ message: "Cập nhật thành công", user });
  } catch (err) {
    console.error("❌ updateUser:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ❌ Xóa user (Admin)
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa user" });
  } catch (err) {
    console.error("❌ deleteUser:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// 🧾 Cập nhật thông tin người dùng khi checkout hoặc AccountDetails
exports.updateInfo = async (req, res) => {
  try {
    const { fullName, phone, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { fullName, phone, email },
      { new: true }
    );

    if (!user)
      return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });

    res.json({ success: true, message: "Cập nhật thành công!", user });
  } catch (err) {
    console.error("❌ updateInfo:", err);
    res.status(500).json({ success: false, message: "Cập nhật thất bại" });
  }
};

// 🔒 Đổi mật khẩu người dùng
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Mật khẩu cũ không chính xác" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: "Đổi mật khẩu thành công!" });
  } catch (err) {
    console.error("❌ changePassword:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
