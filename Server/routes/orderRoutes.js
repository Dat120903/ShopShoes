const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// ✅ User
router.post("/", orderController.createOrder);
router.get("/user/:userId", orderController.getUserOrders);
router.get("/:id", orderController.getOrderById);

// ✅ Admin
router.get("/", orderController.getAllOrders);
router.put("/:id/status", orderController.updateOrderStatus);

module.exports = router;
