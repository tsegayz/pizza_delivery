const Restaurant = require("./../models/restaurantModel");
const APIFeatures = require("./../utils/apiFeatures");

// HANDLER FUNCTIONS
// getting all Restaurant
exports.aliasTopRestaurant = (req, res, next) => {
	(req.query.limit = "5"), (req.query.sort = "review");
	next();
};

exports.getAllRestaurant = async (req, res) => {
	try {
		const features = new APIFeatures(Restaurant.find(), req.query)
			.filter()
			.sort()
			.limitFields()
			// .pagination();
		// EXECUTING QUERY
		const restaurants = await features.query;

		// SENDING RESPONSE
		res.status(200).json({
			status: "success",
			responseTime: req.requestTime,
			results: restaurants.length,
			data: {
				restaurants,
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

// a single Restaurant using parameters in our case is id
exports.getRestaurant = async (req, res) => {
	try {
		const restaurant = await Restaurant.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: restaurant,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: " invalide id",
		});
	}
};

//// create new Restaurant
exports.createRestaurant = async (req, res) => {
	try {
		const newRestaurant = await Restaurant.create(req.body);

		res.status(201).json({
			status: "sucess",
			data: {
				restaurant: newRestaurant,
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

// Updating Restaurant
exports.updateRestaurant = async (req, res) => {
	try {
		const newRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: "success",
			data: {
				restaurant: newRestaurant,
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

// Delete Restaurant
exports.deleteRestaurant = async (req, res) => {
	try {
		const newRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
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
