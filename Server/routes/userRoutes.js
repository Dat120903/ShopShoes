const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// WISHLIST (chuẩn FE đang gọi)
router.get("/wishlist/:userId", authController.getWishlist);
router.put("/wishlist/:userId", authController.updateWishlist);

// USER INFO
router.put("/update-info/:id", userController.updateInfo);
router.put("/change-password/:id", userController.changePassword);

// ADMIN CRUD
router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
