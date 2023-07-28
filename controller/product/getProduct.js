const { Op } = require("sequelize");
const db = require("../../db/db");
const Validation = require("../../utils/errorMessage");
const userdata = db.userdata;
const products = db.products;
const usercart = db.usercart;
async function getProduct(req, resp) {
  try {
    const id = req.params.id;
    const currentUser = req.user;
    //console.log("idd remove cart:", id);
    const cartcount = await usercart.count({
      where: {
        userId: currentUser.id,
        isDelete: false,
      },
    });
    //console.log("headrss..", req.header("x-auth-token"));
    let condition = {
      isDelete: false,
    };
    if (req.body.search) {
      let search = req.body.search;
      const noPuncuationSearch = search?.replace(
        /[^A-Za-z0-9]+/g,
        "[^A-Za-z0-9]+"
      );
      condition[Op.or] = [
        {
          productName: {
            [Op.substring]: `${search}`,
          },
        },
        {
          productModel: {
            [Op.substring]: `${search}`,
          },
        },
      ];
      //console.log("nnn", noPuncuationSearch);
    }
    const pageNumber = req.body.pageNumber;
    //console.log("pageNumber", pageNumber);
    const amount = await products.count({
      where: condition,
    });
    const count = Math.ceil(amount / 10);
    const pageSize = 10;
    const page = pageNumber;
    //console.log(`count ${amount}`);
    //console.log("current user", currentUser);
    let data = {};
    if (currentUser) {
      if (currentUser.userType == "shopOwner") {
        //console.log("yeyeyey");
        //console.log("Condition...", condition);
        let Alldata = await userdata.findAll({
          where: {
            id: currentUser.id,
            isDelete: false,
          },
          include: {
            model: products,
            where: condition,
            offset: pageSize * page,
            limit: pageSize,
            order: [["productName", "ASC"]],
          },
        });
        data = Alldata[0].products;
      } else if (currentUser.userType == "admin") {
        let Alldata = await products.findAll({
          where: condition,
          offset: pageSize * page,
          limit: pageSize,
          order: [["productName", "ASC"]],
          include: {
            model: userdata,
            where: {
              isDelete: false,
            },
          },
        });
        data = Alldata;
        //console.log("------", data);
      } else {
        data = await products.findAll({
          where: condition,
          offset: pageSize * page,
          limit: pageSize,
          order: [["productName", "ASC"]],
        });
      }
    } else {
      data = await products.findAll({
        where: condition,
        offset: pageSize * page,
        limit: pageSize,
        order: [["productName", "ASC"]],
      });
    }
    if (data) {
      resp.status(200).json({
        status: 200,
        data,
        pageSize,
        count: count,
        cartcount: cartcount,
      });
    }
  } catch (err) {
    let msg = Validation(err);
    resp.status(400).json({
      status: 400,
      message: msg,
    });
    //console.log("eeeeeee:", err);
  }
}
module.exports = getProduct;
