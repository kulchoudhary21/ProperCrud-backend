const express = require("express");
const router = express.Router();
const createProduct = require("../controller/product/createProduct");
const getProduct = require("../controller/product/getProduct");
const test = require("../controller/product/test");
const test2 = require("../controller/product/test2");
const getOneProduct = require("../controller/product/getOneProduct");
const updateProduct = require("../controller/product/updateProduct");
const deleteProduct = require("../controller/product/deleteProduct");
const verifingToken = require("../middleware/jwtTokenVerified");
//-----------CRUD Api for product creating---------------//
router.post("/addProduct", verifingToken, (req, resp) => {
  return createProduct(req, resp);
});

router.post("/getProduct", verifingToken, (req, resp) => {
  return getProduct(req, resp);
});

router.get("/getOneProduct/:id", verifingToken, (req, resp) => {
  return getOneProduct(req, resp);
});
router.put("/updateProduct", verifingToken, (req, resp) => {
  console.log("uuuuuuu",req.body)
  return updateProduct(req, resp);
});
router.delete("/deleteProduct/:id", verifingToken, (req, resp) => {
  return deleteProduct(req, resp);
});

router.get("/testing", (req, resp) => {
  return test(req, resp);
});

router.get("/testingp", (req, resp) => {
  return test2(req, resp);
});
module.exports = router;
