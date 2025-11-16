const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// AUTH
router.post("/register", authController.register);   // đăng ký
router.post("/login", authController.login);         // đăng nhập
router.get("/me", authController.me);                // lấy thông tin user từ token

module.exports = router;
