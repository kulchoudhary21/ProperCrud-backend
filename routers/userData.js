const express = require("express");
const router = express.Router();
const createUser = require("../controller/user/createUser");
const getUser = require("../controller/user/getUser");
const getOneUser = require("../controller/user/getOneUser");
const updateUser = require("../controller/user/updateUser");
const deleteUser = require("../controller/user/deleteUser");
const LoginUser = require("../controller/login/LoginUser");
const verifingToken = require("../middleware/jwtTokenVerified");
//-----------CRUD Api for user creating---------------//

router.get("/getOne/:id", verifingToken,(req, resp) => {
  return getOneUser(req, resp);
});

router.put("/update",verifingToken, (req, resp) => {
  return updateUser(req, resp);
});

router.delete("/delete/:id", verifingToken,(req, resp) => {
  return deleteUser(req, resp);
});

router.post("/get",verifingToken, (req, resp) => {
  return getUser(req, resp);
});
//-----------login api---------------//
router.post("/login",(req,resp)=>{
  return LoginUser(req,resp)
})
//-----------Register api---------------//
router.post("/create",(req, resp) => {
  return createUser(req, resp);
});
module.exports = router;
