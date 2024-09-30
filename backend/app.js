const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(express.json());
const corsOptions = {
	origin: "http://localhost:3000", // Replace with frontend origin
};

app.use(cors(corsOptions));
app.use("/images", express.static(path.join(__dirname, "images")));

const userRouter = require("./routes/userRouters");
const pizzaRouter = require("./routes/pizzaRouters");
const permissionRouter = require("./routes/permissionRouters");
const restaurantRouter = require("./routes/restaurantsRouters");
const roleRouter = require("./routes/roleRouters");
const orderRouter = require("./routes/orderRouters");
const menuRouter = require("./routes/menuRouters");

// we used it as a middleware to attach it to the main route which is also called mounting
app.use("/api/v1/users", userRouter);
app.use("/api/v1/pizzas", pizzaRouter);
app.use("/api/v1/permissions", permissionRouter);
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/roles", roleRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/menus", menuRouter);

// read operation

module.exports = app;
