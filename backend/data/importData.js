const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Order = require("./../models/restaurantModel");

dotenv.config({ path: `${__dirname}/../config.env` });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

console.log("Database URL:", DB);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful"))
  .catch(err => console.error("DB connection error:", err));

const orders = JSON.parse(
  fs.readFileSync(`${__dirname}/restaurant.json`, "utf-8")
);

// Import data
const importData = async () => {
  try {
    await Order.create(orders);
    console.log("Data loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete data
const deleteData = async () => {
  try {
    await Order.deleteMany();
    console.log("Data deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}