const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: String,
    toppings: {
        type: [String], 
        default: [],
    },
    price: {
        type: Number,
        required: true,
    },
    image: String
});
const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
