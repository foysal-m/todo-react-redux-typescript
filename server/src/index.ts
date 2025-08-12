const express = require("express");
const cors = require("cors")();
const port = 4000;
const compression = require("compression");
const router = require("./router");

const connection = require("./models");

const app = express();
app.use(compression({ threshold: 0 }));
app.use(express.json());
app.use(cors);
app.use(router);

(async () => {
  try {
    await connection;
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Todo app listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
