require("dotenv").config();
const mongoose = require("mongoose");

module.exports = mongoose.connect(process.env.DATA_BASE_URL);

// here we need a mondoDB connection string to connect to the database
// we can get this from the MongoDB Atlas dashboard
// the connection string is stored in the .env file
// the connection string is accessed using process.env.DATA_BASE_URL
