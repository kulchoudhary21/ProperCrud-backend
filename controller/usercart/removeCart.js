const db = require("../../db/db");
const Validation = require("../../utils/errorMessage");
const usercart = db.usercart;
async function removeCart(req, resp) {
  try {
    const id = req.params.id;
    console.log("idd remove cart:", id);
    const data = await usercart.update(
      { isDelete: true },
      {
        where: {
          id: id,
        },
      }
    );
    resp.status(200).json({
      message: "deleted suucessfully",
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
