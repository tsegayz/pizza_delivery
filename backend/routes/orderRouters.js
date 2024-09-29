const express = require("express");
const orderController = require("../controllers/orderController");
const authController = require('../controllers/authController')


// ////// TOURS router
const router = express.Router();

// CHAINING different middlewares
router
	.route("/")
	.get(orderController.getAllOrder)
	.post(authController.protect,  orderController.createOrder);
router
	.route("/:id")
	.get(orderController.getOrder)
	.patch(authController.protect,  orderController.updateOrder)
	.delete(authController.protect, orderController.deleteOrder);

module.exports = router;
