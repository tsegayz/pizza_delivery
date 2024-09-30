const express = require("express");
const menuController = require("../controllers/menuController");
const authController = require("../controllers/authController");

// ////// TOURS router
const router = express.Router();

// CHAINING different middlewares
router
	.route("/")
	.get(
		authController.protect,
		authController.restrictTo(1),
		menuController.getAllMenu
	)
	.post(menuController.uploadMenuImage, menuController.createMenu);

module.exports = router;
