const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// AUTH
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user/:id", authController.getUser);
router.put("/update/:id", authController.updateProfile);



// CART
router.get("/cart/:userId", authController.getCart);
router.put("/cart/:userId", authController.updateCart);

module.exports = router;
