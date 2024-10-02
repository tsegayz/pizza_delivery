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
        // Log the incoming request body to debug
        console.log("Incoming Request Body: ", req.body);

        const { name, email, phoneNumber } = req.body;

        // Set default role to 'Admin' if not provided
        const role = req.body.role || "Admin";

        // Log the role to make sure it's set correctly
        console.log("Role: ", role);

        // Fetch the role from the database
        const roleData = await Role.findOne({ name: role });

        // If the role is not found, return an error
        if (!roleData) {
            console.log("Role not found");
            return res.status(400).json({
                status: "fail",
                message: "Role not found",
            });
        }

        console.log("Role Data: ", roleData);

        const newUser = await User.createAdminUser({
            name,
            email,
            phoneNumber,
            role_id: roleData._id, // Use the role_id from the fetched role data
        });

        // Send back the created user
        res.status(201).json({
            status: "success",
            data: newUser,
        });
    } catch (err) {
        console.log("Error: ", err.message);
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
