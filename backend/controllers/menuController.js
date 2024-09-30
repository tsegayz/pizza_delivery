const Menu = require("./../models/menuModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');  
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

exports.uploadMenuImage = upload.single('image');

exports.createMenu = async (req, res) => {
    try {
        const { name, toppings, price } = req.body; 
        const image = req.file ? req.file.filename : null;  

        const newMenu = await Menu.create({
            name,
            toppings: JSON.parse(toppings), 
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