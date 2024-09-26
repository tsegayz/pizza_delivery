const Role = require("./../models/roleModel");
const APIFeatures = require("./../utils/apiFeatures");

// HANDLER FUNCTIONS
// getting all Roles
exports.getAllRole = async (req, res) => {
	try {
		const features = new APIFeatures(Role.find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.pagination();
		// EXECUTING QUERY
		const roles = await features.query;

		// SENDING RESPONSE
		res.status(200).json({
			status: "success",
			responseTime: req.requestTime,
			results: roles.length,
			data: {
				roles,
			},
		});
	} catch (err) {
		res.status(404).json({
			data: {
				status: "fail",
				message: err,
			},
		});
	}
};

// a single Role using parameters in our case is id
exports.getRole = async (req, res) => {
	try {
		const role = await Role.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: role,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: " invalide id",
		});
	}
};

//// create new Role
exports.createRole = async (req, res) => {
	try {
		const newRole = await Role.create(req.body);

		res.status(201).json({
			status: "sucess",
			data: {
				role: newRole,
			},
		});
	} catch (err) {
		res.status(404).json({
			data: {
				status: "fail",
				message: err,
			},
		});
	}
};

// Updating Role
exports.updateRole = async (req, res) => {
	try {
		const newRole = await Role.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: "success",
			data: {
				role: newRole,
			},
		});
	} catch (err) {
		res.status(404).json({
			data: {
				status: "fail",
				message: "error updating",
			},
		});
	}
};

// Delete Role
exports.deleteRole = async (req, res) => {
	try {
		const newRole = await Role.findByIdAndDelete(req.params.id);
		res.status(204).json({
			status: "success",
			data: null,
		});
	} catch (err) {
		res.status(404).json({
			data: {
				status: "fail",
				message: "error deleting",
			},
		});
	}
};
