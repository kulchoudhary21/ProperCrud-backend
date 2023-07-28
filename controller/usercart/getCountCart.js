const db = require("../../db/db");
const Validation = require("../../utils/errorMessage");
const products = db.products;
const userdata = db.userdata;
const usercart = db.usercart;
async function getCountCart(req, resp) {
  try {
    const currentUser = req.user;
//console.log("33333333333333333333333")
    const count = await usercart.findAll({
      where: {
        userId: currentUser.id,
        isDelete: false,
      },
    });
    
    if (count) {
      resp.status(200).json({
        status: 200,
        message: "Succesfully added..",
        count: count.length,
      });
    }
  } catch (err) {
    let msg = Validation(err);
    resp.status(400).json({
      status: 400,
      message: msg,
    });
    //console.log("eeeeeee.........:", err);
  }
}
module.exports = getCountCart;
