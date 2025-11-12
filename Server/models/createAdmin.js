const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/shoedb").then(async () => {
  console.log("✅ Kết nối MongoDB thành công!");

  const username = "admin";
  const password = "123456"; // m có thể đổi
  const hashed = await bcrypt.hash(password, 10);

  const existing = await User.findOne({ username });
  if (existing) {
    console.log("⚠️ Admin đã tồn tại rồi!");
    return mongoose.connection.close();
  }

  const admin = new User({
    username,
    password: hashed,
    role: "admin", // 🚨 BẮT BUỘC
  });

  await admin.save();
  console.log("✅ Tạo admin thành công!");
  console.log("👤 Tài khoản:", username);
  console.log("🔑 Mật khẩu:", password);

  mongoose.connection.close();
});
