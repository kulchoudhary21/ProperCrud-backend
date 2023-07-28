const socket = require("socket.io");
const getMessage = require("../controller/message/getMessage");
const setSocketMessage = require("../controller/message/setSocketMessage");
const setUserMessage=require("../controller/chat/setUserSocket")
const getUserSelf=require("../controller/chat/getUserSelf")
async function socketConfig(server) {
  const io = socket(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    //console.log("socketId", socket.id);
    socket.on("join_room", async (data) => {
      //console.log("rooommm...", data);
      socket.join(data);
      const result = await getMessage(data);
      io.in(data).emit("broadcast", result);
    });
    socket.on("send_message", async (data,lastMessages) => {
      console.log("============================================================================data21",data)
      const setSocketMessag = await setSocketMessage(data);
      const result = await getMessage(data.roomId);
      //console.log("cccc",setSocketMessag)
      io.to(data.roomId).emit("broadcast", result,lastMessages);
    });
    // getUserSelf
    socket.on("join_room_self", async (roomSelf) => {
      //console.log("rooommm...",roomSelf);
      socket.join(roomSelf);
      const result = await getUserSelf(roomSelf);
      //console.log("-hnbhfjnthnghfbnfghnbvghmbgf",result)
      io.to(roomSelf).emit("broadcast_self", result);
    });

    // socket.on("send_message_self", async (data,lastMessages) => {
    //   const setuser = await setUserSelf(data);
    //   const result = await getUserSelf(data.roomId);
    //   //console.log("cccc",setSocketMessag)
    //   io.in(data.roomId).emit("broadcast_self", result,lastMessages);
    // });

    socket.on("disconnect", () => {
      //console.log("user Disconnect");
    });
  });
}

module.exports = socketConfig;
