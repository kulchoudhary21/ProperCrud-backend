const { Op } = require("sequelize");
const db = require("../../db/db");
const Validation = require("../../utils/errorMessage");
const userData = db.userdata;
async function getUsers(req, resp) {
  try {
    const currentUser = req.body.id;
    // //console.log("currentUser-----", currentUser);
    const data = await userData.findAll({
      where: {
        isDelete: false,
        id: {
          [Op.ne]: currentUser,
        },
      },
      attributes: {
        exclude: ["passwd"],
      },
    });
    if (data) {
      resp.status(200).json({
        status: 200,
        data,
      });
    }
  } catch (err) {
    let msg = Validation(err);
    resp.status(400).json({
      status: 400,
      message: msg,
    });
    // //console.log("eeeeeee:", err);
  }
}
module.exports = getUsers;
