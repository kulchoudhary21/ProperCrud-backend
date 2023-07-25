const express = require("express");
const router = express.Router();
const paymentOrder=require("../controller/paymentGateway/paymentOrder")
const paymentVerified=require("../controller/paymentGateway/paymentVerified")

router.post("/create",paymentOrder)
router.post("/success",paymentVerified)

module.exports=router