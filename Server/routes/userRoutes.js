const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const wishlistController = require("../controllers/wishlistController");

// WISHLIST đúng route
router.get("/wishlist/:id", wishlistController.getWishlist);
router.put("/wishlist/:id", wishlistController.updateWishlist);

// USER INFO
router.put("/update-info/:id", userController.updateInfo);
router.put("/change-password/:id", userController.changePassword);

// ADMIN CRUD
router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
