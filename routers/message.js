const express = require("express");
const setMessage = require("../controller/message/setMessage");
const lastMessage=require("../controller/message/lastMessage")
const router = express.Router();

router.post("/setMessage",setMessage)
router.post("/lastMessage",lastMessage)
module.exports=router