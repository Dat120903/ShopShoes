const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// 🧩 AUTH (đăng ký, đăng nhập, thông tin user)
router.post("/register", authController.register);   // Đăng ký
router.post("/login", authController.login);         // Đăng nhập
router.get("/user/:id", authController.getUser);     // Lấy thông tin user
router.put("/update/:id", authController.updateProfile); // Cập nhật hồ sơ

// 💖 WISHLIST
router.get("/wishlist/:userId", authController.getWishlist);
router.put("/wishlist/:userId", authController.updateWishlist);

// 🛒 CART (để khớp với FE: /api/auth/cart/:userId)
router.get("/cart/:userId", authController.getCart);
router.put("/cart/:userId", authController.updateCart);

module.exports = router;
