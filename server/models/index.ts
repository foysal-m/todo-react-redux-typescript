const mongoose = require("mongoose");
require("dotenv").config();

module.exports = mongoose.connect(process.env.DATA_BASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
