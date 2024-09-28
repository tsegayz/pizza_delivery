const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
	_id: { type: Number, required: true },
	name: {
		type: String,
		required: [true, "a role must have a name"],
	},
	description: String,
	noOfOrder: {
		type: Number,
	},
	pizza_id: {
		type: Number,
	},
	image: String,
	ingredient: String,
});

// THE MODEL
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
