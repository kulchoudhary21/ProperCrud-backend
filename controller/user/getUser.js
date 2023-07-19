const { Op } = require("sequelize");
const db = require("../../db/db");
const Validation = require("../../utils/errorMessage");
const userData = db.userdata;
async function getUser(req, resp) {
  try {
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
          username: {
            [Op.substring]: `${search}`,
          },
        },
        {
          email: {
            [Op.substring]: `${search}`,
          },
        },
      ];
      console.log("nnn", noPuncuationSearch);
    }
    const pageNumber = req.body.pageNumber;
    console.log("pageNumber", pageNumber);
    const amount = await userData.count({
      where: condition,
    });
    const count = Math.ceil(amount / 10);
    const pageSize = 10;
    const page = pageNumber;
    console.log(`count ${amount}`);
    const data = await userData.findAll({
      where: condition,
      attributes: {
        exclude: ["passwd"],
      },
      offset: pageSize * page,
      limit: pageSize,
      order: [["username", "ASC"]],
    });
    if (data) {
      resp.status(200).json({
        status: 200,
        data,
        pageSize,
        count: count,
      });
    }
  } catch (err) {
    let msg = Validation(err);
    resp.status(400).json({
      status: 400,
      message: msg,
    });
    console.log("eeeeeee:", err);
  }
}
module.exports = getUser;
