try {
  const file = req.files.file;
  var uniquefileName = Date.now() + "_" + file.name;
  var pathname = path.join(
    __dirname,
    "../public/uploads/TutorAddDocumentImage",
    uniquefileName
  );
  file.mv(pathname, (err) => {
    if (err) {
      // //console.error(err);
    } else {
      // //console.log("successfull updated image");
    }
  });
  const data1 = await Add_document.updateOne(
    { _id: req.body._id },
    {
      $set: {
        title: obj.title,
        book: obj.book,
        subject: obj.subject,
        course: obj.course,
        price: obj.price,
        tag: obj.tag,
        updatedAt: Date(),
        image_name: uniquefileName,
      },
    }
  );
  res.status(200).json({
    message: "sussessfully updated data",
    status: 200,
  });
} catch (e) {
  res.status(200).json({
    message: e.message,
    status: 400,
  });
}

// module.exports = (sequelize, DataTypes) => {
//   const messages = sequelize.define("messages", {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false,
//     },
//     chatName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notNull: true,
//         notEmpty: true,
//       },
//     },
//     isGroupChat: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: false,
//       validate: {
//         notNull: true,
//         notEmpty: true,
//       },
//     },
//     latestMessageId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       validate: {
//         notNull: true,
//         notEmpty: true,
//       },
//     },
//     groupAdminId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       validate: {
//         notNull: true,
//         notEmpty: true,
//       },
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       validate: {
//         notNull: true,
//         notEmpty: true,
//       },
//     },
//     isDelete: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: false,
//       validate: {
//         notNull: true,
//         notEmpty: true,
//       },
//     },
//   });
//   return messages;
// };


// const { Op } = require("sequelize");
// const db = require("../../db/db");
// const AllUsersDataWithLastMessage = require("../chat/AllUsersDataWithLastMessage");
// const chat = db.chats;
// const messages = db.messages;
// const userdata = db.userdata;
// async function lastMessage(ReceiverIdd, senderId) {
//   try {
//     let ReceiverId=ReceiverIdd.body.ReceiverId
//     console.log("rrriiifff1111", ReceiverId);
//     const roomIds = await chat.findAll({
//       where: {
//         [Op.or]: [
//           {
//             [Op.and]: [
//               { userSenderId: senderId },
//               { userReceiverId: ReceiverId },
//             ],
//           },
//           {
//             [Op.and]: [
//               { userSenderId: ReceiverId },
//               { userReceiverId: senderId },
//             ],
//           },
//         ],
//       },
//     });
//     // console.log("roomIds..", roomIds);
//     let userdataArray = [];
//     let idArray = [];
//     for (let item of roomIds) {
//       console.log("ititittiti", item.id);
//       const messageAndUser = await messages.findAll({
//         where: {
//           roomId: item.id,
//           isDelete: false,
//           userReceiverId: ReceiverId,
//         },
//         order: [["createdAt", "DESC"]],
//         include: {
//           model: userdata,
//           where: {
//             isDelete: false,
//           },
//         },
//       });
//       //   console.log("messageAndUser.length", messageAndUser.length);
//       if (messageAndUser?.length > 0) {
//         let users = {
//           id: messageAndUser[0].userdatum.id,
//           username: messageAndUser[0].userdatum.username,
//           name: messageAndUser[0].userdatum.name,
//           userType: messageAndUser[0].userdatum.userType,
//           gender: messageAndUser[0].userdatum.gender,
//           age: messageAndUser[0].userdatum.age,
//           image: messageAndUser[0].userdatum.image,
//           email: messageAndUser[0].userdatum.email,
//           isDelete: messageAndUser[0].userdatum.isDelete,
//           createdAt: messageAndUser[0].userdatum.createdAt,
//           updatedAt: messageAndUser[0].userdatum.updatedAt,
//           lastMessage: messageAndUser[0].messages,
//           count: messageAndUser.length,
//         };
//         userdataArray.push(users);
//         idArray.push(users.id);
//       }
//     }
//     // console.log("isisis", idArray);
//     const userdatas = await userdata.findAll({
//       where: {
//         isDelete: false,
//         id: {
//           [Op.notIn]: idArray,
//           [Op.ne]: ReceiverId,
//         },
//       },
//       attributes: {
//         exclude: ["passwd"],
//       },
//     });
//     // console.log("userdatas", userdatas);
//     // const userdatas=await AllUsersDataWithLastMessage(ReceiverId)
//     userdataArray = [...userdataArray, ...userdatas];
//     // return userdataArray;
//     senderId.send(roomIds)
//   } catch (err) {
//     console.log("eerrr", err);
//   }
// }
// module.exports = lastMessage;
