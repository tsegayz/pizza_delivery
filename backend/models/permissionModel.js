const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
	_id: { type: Number, required: true },
	name: {
		type: String,
		required: [true, "a role must have a name"],
	},
	description: String
});

// THE MODEL
const Permission = mongoose.model("Permission", permissionSchema);

module.exports = Permission;
