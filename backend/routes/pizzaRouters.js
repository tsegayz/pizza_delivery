const express = require("express");
const pizzaController = require("../controllers/pizzaController");
const authController = require('../controllers/authController')


// ////// TOURS router
const router = express.Router();

// CHAINING different middlewares
router
	.route("/")
	.get(pizzaController.getAllPizza)
	.post(authController.protect, authController.restrictTo(1), pizzaController.createPizza);
router
	.route("/:id")
	.get(pizzaController.getPizza)
	.patch(authController.protect, authController.restrictTo(1),  pizzaController.updatePizza)
	.delete(authController.protect, authController.restrictTo(1), pizzaController.deletePizza);

module.exports = router;
