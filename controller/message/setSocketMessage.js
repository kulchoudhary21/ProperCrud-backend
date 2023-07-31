const db = require("../../db/db");
const message = db.messages;
async function setSocketMessage(messageDetail) {
  try {
    console.log("rerereData", messageDetail);
      const data = await message.create(messageDetail);
      return data
  } catch (err) {
    console.log("errrr in setsocket",err)
  }
}
module.exports = setSocketMessage;
