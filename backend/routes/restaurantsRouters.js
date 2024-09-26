const express = require("express");
const restaurantController = require("../controllers/restaurantController");
const authController = require("../controllers/authController");

const router = express.Router();

// CHAINING different middlewares
router
	.route("/")
	.get(restaurantController.getAllRestaurant)
	.post(
		authController.protect,
		authController.restrictTo(1),
		restaurantController.createRestaurant
	);
router
	.route("/:id")
	.get(restaurantController.getRestaurant)
	.patch(
		authController.protect,
		authController.restrictTo(1),
		restaurantController.updateRestaurant
	)
	.delete(
		authController.protect,
		authController.restrictTo(1),
		restaurantController.deleteRestaurant
	);

module.exports = router;
