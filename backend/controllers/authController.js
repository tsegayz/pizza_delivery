const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

//// Create a new token
const signinToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

// Sign Up User
exports.signup = async (req, res, next) => {
	try {
		// Validate password confirmation
		if (req.body.password !== req.body.passwordConfirm) {
			return res.status(400).json({
				status: "fail",
				message: "Passwords do not match",
			});
		}

		const newUser = await User.create({
			_id: req.body._id,
			email: req.body.email,
			password: req.body.password,
			passwordConfirm: req.body.passwordConfirm,
			role_id: req.body.role_id || 2,
			permission_id: req.body.permission_id || 2,
			location: req.body.location,
			phoneNumber: req.body.phoneNumber,
		});

		// Automatically log in the user
		const token = signinToken(newUser._id);
		console.log(`Token: ${token}`);

		res.status(201).json({
			status: "success",
			token,
			data: {
				user: newUser,
			},
		});
	} catch (err) {
		if (err.name === "MongoError" && err.code === 11000) {
			return res.status(400).json({
				status: "fail",
				message: "Email already exists",
			});
		}
		console.error("Signup Error:", err);
		res.status(400).json({
			status: "fail",
			message: err.message || "Signup failed",
		});
		next(err);
	}
};

// Logging in user
exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	// Ensure email and password are provided
	if (!email || !password) {
		return res.status(400).json({
			status: "fail",
			message: "Please provide a valid email and password",
		});
	}

	// Find user by email and include password in the query
	const user = await User.findOne({ email }).select("+password");

	// Check if user exists and password is correct
	if (!user || !(await user.correctPassword(password, user.password))) {
		return res.status(401).json({
			status: "fail",
			message: "Incorrect email or password",
		});
	}

	// Generate token and send it to the user
	const token = signinToken(user._id);
	res.status(200).json({
		status: "success",
		user: {
			_id: user._id,
			name: user.name,
			email: user.email,
			role_id: user.role_id,
		},
		token,
	});
};

// Middleware to protect resources
exports.protect = async (req, res, next) => {
    let token;

    // 1) Get the token from the Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    // 2) Ensure token exists
    if (!token) {
        return res.status(401).json({
            status: "fail",
            message: "You are not logged in! Please log in to get access",
        });
    }

    // 3) Verify token
    try {
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // 4) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({
                status: "fail",
                message: "The user belonging to this token no longer exists",
            });
        }

        // 5) Grant access to protected route
        req.user = currentUser;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: 'fail',
                message: 'Your token has expired. Please log in again.',
            });
        }
        return res.status(401).json({
            status: 'fail',
            message: 'Invalid token or token verification failed',
        });
    }
};

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role_id)) {
			return res.status(403).json({
				data: {
					status: "fail",
					message: "You do not have permission to perform this action",
				},
			});
		}
		next();
	};
};
