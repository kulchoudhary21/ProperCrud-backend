const express = require("express");
const router = express.Router();
const createUser = require("../controller/createUser");
const getUser = require("../controller/getUser");
const getOneUser = require("../controller/getOneUser");
const updateUser = require("../controller/updateUser");
const deleteUser = require("../controller/deleteUser");

router.post("/create", (req, resp) => {
  return createUser(req, resp);
});

router.get("/get", (req, resp) => {
  return getUser(req, resp);
});

router.get("/getOne/:id", (req, resp) => {
  return getOneUser(req, resp);
});

router.put("/update", (req, resp) => {
  return updateUser(req, resp);
});

router.put("/delete/:id", (req, resp) => {
  console.log("delete api calling");
  return deleteUser(req, resp);
});
module.exports = router;
