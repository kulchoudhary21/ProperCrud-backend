const path = require("path");
const db = require("../../db/db");
const Validation = require("../../utils/errorMessage");
const userdata = db.userdata;

async function getOneUser(req, resp) {
  try {
    const id = req.params.id;
    const data = await userdata.findAll({
      where: { id: id },
      attributes: {
        exclude: ["passwd"],
      },
    });
    //console.log("---", data[0].dataValues);
    resp.status(200).json({
      status: 200,
      data,
    });
  } catch (err) {
    const msg = Validation(err);
    resp.status(400).json({
      message: msg,
      status: 400,
    });
    //console.log("eeeeeee:", err);
  }
}
module.exports = getOneUser;
