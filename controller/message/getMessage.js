const db = require("../../db/db");
const message = db.messages;
const userdata = db.userdata;
async function getMessage(roomId) {
  try {

    const result = await message.findAll({
      where: { roomId: roomId },
      include: [
        {
          model: userdata,
          where: { isDelete: false },
          
        },
      ],
    });
    console.log("fetching messages", result);
    return result;
  } catch (err) {}
}
module.exports = getMessage;
