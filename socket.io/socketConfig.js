const socket = require("socket.io");
const getMessage = require("../controller/message/getMessage");
const setSocketMessage = require("../controller/message/setSocketMessage");
const setUserMessage = require("../controller/chat/setUserSocket");
const getUserSelf = require("../controller/chat/getUserSelf");
const getIndivisualSelfId = require("../controller/chat/getIndivisualSelfId");
const lastMessage=require("../controller/message/lastMessage");
const AllUsersDataWithLastMessage = require("../controller/chat/AllUsersDataWithLastMessage");
async function socketConfig(server) {
  const io = socket(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    socket.on("join_room", async (data) => {
      if (socket.room) {
        socket.leave(socket.room);
      }
      socket.join(data);
      socket.room = data;
      const result = await getMessage(data);
      io.in(data).emit("broadcast", result);
    });
    socket.on("send_message", async (data) => {
      const setSocketMessag = await setSocketMessage(data);
      const result = await getMessage(data.roomId);

      const indivisualSelfID = await getIndivisualSelfId(data);
      io.to(data.roomId).emit("broadcast", result);

      const userdatas=await lastMessage(data.userReceiverId,data.userSenderId) 
      // const userdatas=await AllUsersDataWithLastMessage(data.userSenderId)
      if(indivisualSelfID?.receiverSelfId?.id)
      io.to(indivisualSelfID.receiverSelfId.id).emit(
        "sender_selfid",
        userdatas
      );
    });

    socket.on("join_room_self", async (roomSelf,receiverIdd) => {
      socket.join(roomSelf);
      // const result = await getUserSelf(roomSelf);
      const result=await AllUsersDataWithLastMessage(receiverIdd)
      console.log("room self id");
      io.to(roomSelf).emit("broadcast_self", result);
    });

    socket.on("disconnect", () => {
      //console.log("user Disconnect");
    });
  });
}

module.exports = socketConfig;

// const roomClients = await (await io.in(data).fetchSockets()).length;
//       console.log("roomClients...", roomClients);
//       io.to(data).emit("user_count", { count: roomClients });
//       socket.on("disconnect", () => {
//         io.to(data).emit("user_count", { count: roomClients });
//       });

// socket.on("send_message_self", async (data) => {
//   const setuser = await setUserSelf(data);
//   const result = await getUserSelf(data.roomId);
//   console.log("cccc",setSocketMessag)
//    io.in(data.roomId).emit("broadcast_self", result,lastMessages);
//  });


// ----roomid pe 
//     -----particular reciver id
//          ----get count on behalf of its isRead ? or not .