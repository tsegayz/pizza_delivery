const User = require("./../models/userModel");
// ////// user route handler function

exports.getAllUsers = async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		status: "sucess",
		results: users.length,
		data: {
			users,
		},
	});
	next();
};
exports.getUser = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "route to be defined later",
	});
};
exports.createUser = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "route to be defined later",
	});
};
exports.updateUser = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "route to be defined later",
	});
};
exports.deleteUser = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "route to be defined later",
	});
};
