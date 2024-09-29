const Order = require("./../models/orderModel");
const APIFeatures = require("./../utils/apiFeatures");

// HANDLER FUNCTIONS
// getting all orders

exports.getAllOrder = async (req, res) => {
	try {
		const features = new APIFeatures(Order.find(), req.query)
			.filter()
			.sort()
			.limitFields();
		// .pagination();
		// EXECUTING QUERY
		const orders = await features.query;

		// SENDING RESPONSE
		res.status(200).json({
			status: "success",
			responseTime: req.requestTime,
			results: orders.length,
			data: {
				orders,
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

exports.createOrder = async (req, res) => {
    try {
        const { user_id, toppings, quantity, price } = req.body; // Include user_id

        const newOrder = await Order.create({
            user_id, 
            toppings, 
            quantity,
            price,
        });

        res.status(201).json({
            status: 'success',
            data: newOrder,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};
    
exports.getOrder = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: [order],
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: " invalide id",
		});
	}
};

// Updating order
exports.updateOrder = async (req, res) => {
	try {
		const newOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: "success",
			data: {
				order: newOrder,
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

// Delete Order
exports.deleteOrder = async (req, res) => {
	try {
		const newOrder = await Order.findByIdAndDelete(req.params.id);
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
