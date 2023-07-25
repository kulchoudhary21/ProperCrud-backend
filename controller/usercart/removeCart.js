const db = require("../../db/db");
const Validation = require("../../utils/errorMessage");
const usercart = db.usercart;
async function removeCart(req, resp) {
  try {
    const id = req.params.id;
    const currentUser = req.user;
    console.log("idd remove cart:", id);
    const data = await usercart.update(
      { isDelete: true },
      {
        where: {
          id: id,
        },
      }
    );
    const count = await usercart.count({
      where: {
        userId: currentUser.id,
        isDelete: false,
      },
    });
    resp.status(200).json({
      message: "deleted suucessfully",
      count: count,
      status: 200,
    });
  } catch (err) {
    const msg = Validation(err);
    resp.status(400).json({
      message: msg,
      status: 400,
    });
  }
}
module.exports = removeCart;
