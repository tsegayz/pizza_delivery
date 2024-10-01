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
const Role = require("./../models/roleModel");

exports.createUser = async (req, res) => {
	try {
		const { name, email, phoneNumber, role } = req.body;

		// Fetch the role_id based on the provided role name (assuming this function exists)
		const roleData = await Role.findOne({ name: role });

		if (!roleData) {
			return res.status(400).json({
				status: "fail",
				message: "Role not found",
			});
		}

		// Create a user without requiring a password
		const newUser = await User.createAdminUser({
			name,
			email,
			phoneNumber,
			role_id: roleData._id, // Use the role_id from the fetched role data
		});

		res.status(201).json({
			status: "success",
			data: newUser,
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err.message,
		});
	}
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
