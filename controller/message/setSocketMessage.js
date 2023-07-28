const { ValidationError } = require("sequelize");
const db = require("../../db/db");
const message = db.messages;
async function setSocketMessage(messageDetail) {
  try {
    console.log("rerereData", messageDetail);
      const data = await message.create(messageDetail);
      console.log("dtdtdt11", data);
      return data
  } catch (err) {
    console.log("errrr",err)
  }
}
module.exports = setSocketMessage;
