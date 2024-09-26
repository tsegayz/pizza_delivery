require('dotenv').config({ path: './config.env' }); 

const express = require('express');
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    serverSelectionTimeoutMS: 30000 
}).then(() => {
    console.log('DB connection successful');
}).catch((err) => {
    console.error('DB connection error:', err);
});

const app = require("./app");

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Running on port ${port}....`);
});


