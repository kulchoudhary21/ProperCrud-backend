const { Op } = require("sequelize");
const db = require("../../db/db");
const Validation = require("../../utils/errorMessage");
const chat = db.chats;
async function verifiedForRoom(req, resp) {
  try {
    // //console.log("req.bodyroom", req.body);
    const data = await chat.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { userSenderId: req.body.userSenderId },
              { userReceiverId: req.body.userReceiverId },
            ],
          },
          {
            [Op.and]: [
              { userSenderId: req.body.userReceiverId },
              { userReceiverId: req.body.userSenderId },
            ],
          },
        ],
      },
    });
    // //console.log("dtetete", data);
    if (data && data.length > 0) {
      resp.status(200).json({
        status: 200,
        data:data,
        roomCheck: true,
      });
    } else {
      const creationData = await chat.create(req.body);
      resp.status(200).json({
        message: "created suucessfully",
        status: 200,
        roomCheck:false
      });
    }
  } catch (err) {
    let msg = Validation(err);
    resp.status(400).json({
      status: 400,
      message: msg,
      roomCheck:false
    });
    // //console.log("eeeeeee:", err);
  }
}
module.exports = verifiedForRoom;
