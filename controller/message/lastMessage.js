const { Op } = require("sequelize");
const db = require("../../db/db");
const AllUsersDataWithLastMessage = require("../chat/AllUsersDataWithLastMessage");
const chat = db.chats;
const messages = db.messages;
const userdata = db.userdata;
async function lastMessage(ReceiverId, senderIdd) {
  try {
    // let ReceiverId=ReceiverIdd.body.ReceiverId
    // let senderId=ReceiverIdd.body.SenderId
    console.log("rrriiifff1111", ReceiverId);
    const roomIds = await chat.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { userSenderId: ReceiverId },
              {
                userReceiverId: {
                  [Op.ne]: ReceiverId,
                },
              },
            ],
          },
          {
            [Op.and]: [
              { userReceiverId: ReceiverId },
              {
                userSenderId: {
                  [Op.ne]: ReceiverId,
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
    // console.log("roomIds..", roomIds);
    let userdataArray = [];
    let idArray = [];
    for (let item of roomIds) {
      console.log("ititittiti", item.id);
      const messageAndUser = await messages.findAll({
        where: {
          roomId: item.id,
          isDelete: false,
          userReceiverId: ReceiverId,
        },
        order: [["createdAt", "DESC"]],
        include: {
          model: userdata,
          where: {
            isDelete: false,
          },
        },
      });
      //   console.log("messageAndUser.length", messageAndUser.length);
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
    // console.log("isisis", idArray);
    const userdatas = await userdata.findAll({
      where: {
        isDelete: false,
        id: {
          [Op.notIn]: idArray,
          [Op.ne]: ReceiverId,
        },
      },
      attributes: {
        exclude: ["passwd"],
      },
    });
    // console.log("userdatas", userdatas);
    // const userdatas=await AllUsersDataWithLastMessage(ReceiverId)
    userdataArray = [...userdataArray, ...userdatas];
    return userdataArray;
    // senderIdd.send(userdataArray)
  } catch (err) {
    console.log("eerrr", err);
  }
}
module.exports = lastMessage;

