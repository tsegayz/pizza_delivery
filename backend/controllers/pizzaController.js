const Pizza = require("./../models/pizzaModel");
const APIFeatures = require("./../utils/apiFeatures");

// HANDLER FUNCTIONS
// getting all pizzas

exports.getAllPizza = async (req, res) => {
	try {
		const features = new APIFeatures(Pizza.find(), req.query)
			.filter()
			.sort()
			.limitFields();
		// .pagination();
		// EXECUTING QUERY
		const pizzas = await features.query;

		// SENDING RESPONSE
		res.status(200).json({
			status: "success",
			responseTime: req.requestTime,
			results: pizzas.length,
			data: {
				pizzas,
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

// a single pizza using parameters in our case is id
exports.getPizza = async (req, res) => {
	try {
		const pizza = await Pizza.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: [pizza],
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: " invalide id",
		});
	}
};

//// create new Pizza
exports.createPizza = async (req, res) => {
	try {
		const newPizza = await Pizza.create(req.body);

		res.status(201).json({
			status: "sucess",
			data: {
				pizza: newPizza,
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

// Updating pizza
exports.updatePizza = async (req, res) => {
	try {
		const newPizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: "success",
			data: {
				pizza: newPizza,
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

// Delete pizza
exports.deletePizza = async (req, res) => {
	try {
		const newPizza = await Pizza.findByIdAndDelete(req.params.id);
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
