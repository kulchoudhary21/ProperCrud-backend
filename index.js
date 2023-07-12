const express = require("express");
const cors = require("cors");
const conn = require("./db/db");
const bodyParser = require("body-parser");
const createUserData = require("./controller/createUserData");
const app = express();
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use("/user", createUserData);
app.listen(4001);
