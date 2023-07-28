const express = require("express");
const setMessage = require("../controller/message/setMessage");
const router = express.Router();

router.post("/setMessage",setMessage)
module.exports=router