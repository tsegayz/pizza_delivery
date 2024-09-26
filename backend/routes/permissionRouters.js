const express = require("express");
const permissionController = require("../controllers/permissionController");
const authController = require("../controllers/authController");

// ////// TOURS router
const router = express.Router();

// CHAINING different middlewares
router
	.route("/")
	.get(authController.protect, permissionController.getAllPermission)
	.post(authController.protect, permissionController.createPermission);
router
	.route("/:id")
	.patch(authController.protect, permissionController.updatePermission)
	.delete(authController.protect, permissionController.deletePermission);

module.exports = router;
