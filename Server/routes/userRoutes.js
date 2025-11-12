// SHOESERVER/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// ADMIN CRUD
router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

// USER cập nhật thông tin cá nhân
router.put("/update-info/:id", userController.updateInfo);

// USER đổi mật khẩu
router.put("/change-password/:id", userController.changePassword);

module.exports = router;
