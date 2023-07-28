const { Op } = require("sequelize");
const db=require("../../db/db")
const chat=db.chats
async function setUserMessage(obj) {
  try {
    // //console.log(":nononon", obj);
    const userSenderId = obj.userSenderId;
    const data = await chat.findAll({
      where: {
        [Op.and]: [
          { userSenderId: userSenderId },
          { userReceiverId: userSenderId },
        ],
      },
    });
    // //console.log("dddd..............");
    if (data && data.length > 0) {
    //   //console.log("..............", data);
      return data;
    } else {
      obj.userReceiverId = userSenderId;
    //   //console.log("bojjj",obj)
      const creationData = await chat.create(obj);
    //   //console.log("dddd..............", creationData);
      return creationData;
    }
  } catch (err) {
    // //console.log("errroror..",err)
  }
}
module.exports = setUserMessage;
