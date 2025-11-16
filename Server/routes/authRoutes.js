const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const fumee = require("../controllers/fumeeAuthController");

// LOGIN / REGISTER nội bộ
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authController.me);

// 🔴 Login qua Fumee
router.post("/fumee-login", fumee.fumeeLogin);

module.exports = router;
