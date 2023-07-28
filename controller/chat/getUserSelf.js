const { Op } = require("sequelize");
const db = require("../../db/db");
const chat = db.chats;
const userdata = db.userdata;
async function getUserSelf(roomIdself) {
  try {
    // //console.log(roomIdself);
    const result = await chat.findOne({ where: { id: roomIdself } });
    // //console.log("hihihih:", result.id);
    const data = await userdata.findAll({
      where: { isDelete: false },
      id: {
        [Op.ne]: result.userSenderId,
      },
    });
    return data
  } catch (err) {
    // //console.log(err)
  }
}
module.exports = getUserSelf;
