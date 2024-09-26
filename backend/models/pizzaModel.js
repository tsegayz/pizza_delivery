const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
	_id: { type: Number, required: true },
	name: {
		type: String,
		required: [true, "a pizza must have a name"],
	},
	description: String,
	restaurant_id: {
		type: Number,
		required: true,
	},
	image:String,
	rating: Number

});

// THE MODEL
const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;
