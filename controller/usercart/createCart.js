const db = require("../../db/db");
const Validation = require("../../utils/errorMessage");
const usercart = db.usercart;
async function createCart(req, resp) {
  try {
    // const currentUser = req.user;
    // const count = await usercart.count({
    //   where: {
    //     userId: currentUser.id,
    //     isDelete: false,
    //   },
    // });
    const data = await usercart.create(req.body);
    console.log("usercart detai;s", data);
    resp.status(200).json({
      message: "created suucessfully",
      status: 200,
      // count: count,
    });
  } catch (err) {
    console.log("error....: ", err);
    let msg = Validation(err);
    resp.status(400).json({
      message: msg,
      status: 400,
    });
  }
}
module.exports = createCart;
