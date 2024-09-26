const express = require("express");
const authController = require("../controllers/authController");
const roleController = require("../controllers/roleController");

// ////// TOURS router
const router = express.Router();

// CHAINING different middlewares
router
	.route("/")
	.get(authController.protect, roleController.getAllRole)
	.post(authController.protect, roleController.createRole);
router
	.route("/:id")
	.patch(authController.protect, roleController.updateRole)
	.delete(authController.protect, roleController.deleteRole);

module.exports = router;
