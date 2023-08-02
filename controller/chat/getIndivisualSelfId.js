const { Op } = require("sequelize");
const db = require("../../db/db");
const chat = db.chats;
async function getIndivisualSelfId(data) {
  try {
    console.log("datatatatatata", data);
    if (data) {
      const senderSelfId = await chat.findOne({
        where: {
          [Op.and]: [
            { userSenderId: data.userSenderId },
            { userReceiverId: data.userSenderId },
          ],
        },
      });
      console.log("----r-r-r-rr-", senderSelfId);
      const ReceiverSelfId = await chat.findOne({
        where: {
          [Op.and]: [
            { userSenderId: data.userReceiverId },
            { userReceiverId: data.userReceiverId },
          ],
        },
      });
      const selfId = {
        senderSelfId: senderSelfId,
        receiverSelfId: ReceiverSelfId,
      };
      return selfId;
    }
  } catch (err) {
    console.log("erere", err);
  }
}
module.exports = getIndivisualSelfId;
