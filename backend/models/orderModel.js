const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        ref: 'User', 
        required: true,
    },
    toppings: {
        type: [String], 
        default: [],
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
