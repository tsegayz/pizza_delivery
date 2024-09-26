const Permission = require("./../models/permissionModel");
const APIFeatures = require("./../utils/apiFeatures");

// HANDLER FUNCTIONS
// getting all Permission
exports.getAllPermission = async (req, res) => {
	try {
		const features = new APIFeatures(Permission.find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.pagination();
		// EXECUTING QUERY
		const permissions = await features.query;

		// SENDING RESPONSE
		res.status(200).json({
			status: "success",
			responseTime: req.requestTime,
			results: permissions.length,
			data: {
				permissions,
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

// a single Permission using parameters in our case is id
exports.getPermission = async (req, res) => {
	try {
		const permission = await Permission.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: permission,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: " invalide id",
		});
	}
};

//// create new Permission
exports.createPermission = async (req, res) => {
	try {
		const newPermission = await Permission.create(req.body);

		res.status(201).json({
			status: "sucess",
			data: {
				permission: newPermission,
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

// Updating Permission
exports.updatePermission = async (req, res) => {
	try {
		const newPermission = await Permission.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		res.status(200).json({
			status: "success",
			data: {
				permission: newPermission,
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

// Delete Permission
exports.deletePermission = async (req, res) => {
	try {
		const newPermission = await Permission.findByIdAndDelete(req.params.id);
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
