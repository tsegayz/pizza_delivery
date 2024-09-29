const express = require("express");
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

// ////// TOURS router
const router = express.Router();

// CHAINING different middlewares
router
	.route("/")
	.get(
		authController.protect,
		authController.restrictTo(1),
		orderController.getAllOrder
	)
	.post(orderController.createOrder);
router
	.route("/:id")
	.get(orderController.getOrder)
	.patch(orderController.updateOrder)
	.delete(orderController.deleteOrder);

module.exports = router;
