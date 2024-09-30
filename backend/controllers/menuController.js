const Menu = require("./../models/menuModel");
const APIFeatures = require("./../utils/apiFeatures");

// HANDLER FUNCTIONS
// getting all menu

exports.getAllMenu = async (req, res) => {
	try {
		const features = new APIFeatures(Menu.find(), req.query)
			.filter()
			.sort()
			.limitFields();
		// .pagination();
		// EXECUTING QUERY
		const menus = await features.query;

		// SENDING RESPONSE
		res.status(200).json({
			status: "success",
			responseTime: req.requestTime,
			results: menus.length,
			data: {
				menus,
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

exports.createMenu = async (req, res) => {
    try {
        const { name, toppings, price,  image } = req.body; 

        const newMenu = await Menu.create({
            name, 
            toppings, 
            price,
            image
        });

        res.status(201).json({
            status: 'success',
            data: newMenu,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};