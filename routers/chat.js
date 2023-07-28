const express = require("express");
const router = express.Router();
const test=require("../controller/chat/test")
const getUsers=require("../controller/chat/getUser");
const verifiedForRoom = require("../controller/chat/verifiedForRoom");

router.post("/users",getUsers)
router.post("/room",verifiedForRoom)
module.exports=router