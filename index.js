const express = require("express");
const cors = require("cors");
const conn = require("./db/db");
const bodyParser = require("body-parser");
const userData = require("./routers/userData");
const fileUpload = require("express-fileupload");
const path = require("path");
const products = require("./routers/products");
const usercart = require("./routers/usercart");
const payment = require("./routers/payment");
const message = require("./routers/message");
const chat = require("./routers/chat");
const socketConfig = require("./socket.io/socketConfig");
const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const server = app.listen(3001);
socketConfig(server);

app.use(express.static(path.join(__dirname, "./assets")));
app.use(bodyParser.json());
app.use(fileUpload());
app.use("/user", userData);
app.use("/product", products);
app.use("/usercart", usercart);
app.use("/payment", payment);
app.use("/chat", chat);
app.use("/message", message);
