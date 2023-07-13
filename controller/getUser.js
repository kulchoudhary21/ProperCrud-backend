const db = require("../db/db");
const userData = db.userdata;
async function getUser(req, resp) {
  try {
    const data = await userData.findAll({
      where:{
        isDelete:'false'
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
    resp.status(400).json({
      status: 400,
      data,
    });
    console.log("eeeeeee:", err);
  }
}
module.exports = getUser;
