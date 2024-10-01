const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "a role must have a name"],
	},
	status: {
		type: String,
		default: "Active",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	permission: {
		type: [String],
		default: [],
	},
});

// THE MODEL
const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
