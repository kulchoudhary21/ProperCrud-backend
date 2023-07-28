const db = require("../../db/db");
const Validation = require("../../utils/errorMessage");
const userdata = db.userdata;
const products = db.products;
const usercart = db.usercart;
async function getCart(req, resp) {
  try {
    const currentUser = req.user;
    const count = await usercart.count({
      where: {
        userId: currentUser.id,
        isDelete: false,
      },
    });
    const data = await userdata.findAll({
      where: {
        id: currentUser.id,
        isDelete: false,
      },
      include: [
        {
          model: usercart,
          where: { isDelete: false },
          include: [
            {
              where: { isDelete: false },
              model: products,
            },
          ],
        },
      ],
    });
    resp.status(200).json({
      status: 200,
      data: data,
      count:count
    });
    // let datas = data[0].usercarts;
    //     resp.status(200).json({
    //       status: 200,
    //       data: datas,
    //     });

    // if (data[0]) {
    //   //console.log("-----------", data[0]);
    //   let datas = data[0].usercarts;
    //   if (data[0].usercarts) {
    //     resp.status(200).json({
    //       status: 200,
    //       data: datas,
    //     });
    //   }
    // } else {
    //   resp.status(400).json({
    //     status: 400,
    //     message: "Empty cart !",
    //   });
    // }
  } catch (err) {
    resp.status(400).json({
      status: 400,
      message: "Empty cart !",
    });
    //console.log("eeeeeee:", err);
  }
}
module.exports = getCart;
