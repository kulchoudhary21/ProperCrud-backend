const express = require("express");
const router = express.Router();
const createCart = require("../controller/usercart/createCart");
const getCart = require("../controller/usercart/getCart");
const verifingToken = require("../middleware/jwtTokenVerified");
const getCountCart = require("../controller/usercart/getCountCart");
const removeCart = require("../controller/usercart/removeCart");
router.post("/addCart", createCart);

router.get("/getCart", verifingToken, getCart);

router.get("/getCountCart", verifingToken, getCountCart);

router.delete("/removeCart/:id", verifingToken, removeCart);

module.exports = router;
