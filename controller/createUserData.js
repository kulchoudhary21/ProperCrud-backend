const express = require("express");
const router = express.Router();
const db = require("../db/db");
const userData = db.userdata;
router.post("/create", async (req, resp) => {
  console.log("........",req.body)
  try {
    const data = await userData.create(req.body);
    resp.send("Created succesfully");
    console.log("data1", data);
  } catch (err) {
    console.log("error: ", err);
  }
});
module.exports = router;
