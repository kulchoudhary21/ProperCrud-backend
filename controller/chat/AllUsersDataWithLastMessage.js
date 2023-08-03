const { Op } = require("sequelize");
const db = require("../../db/db");
const chat = db.chats;
const message = db.messages;
const userdata = db.userdata;

async function AllUsersDataWithLastMessage(receiverIdd) {
  try {
    console.log("reqqqq.,jmhmhmjhm.", receiverIdd);
    const roomIds = await chat.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { userSenderId: receiverIdd },
              {
                userReceiverId: {
                  [Op.ne]: receiverIdd,
                },
              },
            ],
          },
          {
            [Op.and]: [
              { userReceiverId: receiverIdd },
              {
                userSenderId: {
                  [Op.ne]: receiverIdd,
                },
              },
            ],
          },
        ],
        // userSenderId: req.body.receiverId,
        // userReceiverId: {
        //   [Op.ne]: req.body.receiverId,
        // },
      },
    });
    console.log("--roomIds-------", roomIds);
    let userdataArray = [];
    let idArray = [];
    for (let item of roomIds) {
      let iddd = item.userReceiverId;
      if (item.userReceiverId === receiverIdd) {
        iddd = item.userSenderId;
      }
      const messageAndUser = await message.findAll({
        where: {
          [Op.or]: [
            {
              [Op.and]: [
                { userSenderId: item.userSenderId },
                { userReceiverId: item.userReceiverId },
              ],
            },
            {
              [Op.and]: [
                { userSenderId: item.userReceiverId },
                { userReceiverId: item.userSenderId },
              ],
            },
          ],
        },
        order: [["createdAt", "DESC"]],
        include: {
          model: userdata,
          where: {
            id: iddd,
            isDelete: false,
          },
        },
      });
      if (messageAndUser?.length > 0) {
        let users = {
          id: messageAndUser[0].userdatum.id,
          username: messageAndUser[0].userdatum.username,
          name: messageAndUser[0].userdatum.name,
          userType: messageAndUser[0].userdatum.userType,
          gender: messageAndUser[0].userdatum.gender,
          age: messageAndUser[0].userdatum.age,
          image: messageAndUser[0].userdatum.image,
          email: messageAndUser[0].userdatum.email,
          isDelete: messageAndUser[0].userdatum.isDelete,
          createdAt: messageAndUser[0].userdatum.createdAt,
          updatedAt: messageAndUser[0].userdatum.updatedAt,
          lastMessage: messageAndUser[0].messages,
          count: messageAndUser.length,
        };
        userdataArray.push(users);
        idArray.push(users.id);
      }
    }

    const userdatas = await userdata.findAll({
      where: {
        isDelete: false,
        id: {
          [Op.notIn]: idArray,
          [Op.ne]: receiverIdd,
        },
      },
      attributes: {
        exclude: ["passwd"],
      },
    });
    userdataArray = [...userdataArray, ...userdatas];
    return userdataArray;
    // resp.send(userdataArray);
  } catch (err) {
    console.log("Errrrr", err);
  }
}
module.exports = AllUsersDataWithLastMessage;
