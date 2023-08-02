const express = require("express");
const router = express.Router();
const test=require("../controller/chat/test")
const getUsers=require("../controller/chat/getUser");
const verifiedForRoom = require("../controller/chat/verifiedForRoom");
const AllUsersDataWithLastMessage = require("../controller/chat/AllUsersDataWithLastMessage");

router.post("/users",getUsers)
router.post("/room",verifiedForRoom)
// router.post("/allusers",AllUsersDataWithLastMessage)
module.exports=router