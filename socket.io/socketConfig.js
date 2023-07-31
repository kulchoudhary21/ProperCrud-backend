const socket = require("socket.io");
const getMessage = require("../controller/message/getMessage");
const setSocketMessage = require("../controller/message/setSocketMessage");
const setUserMessage = require("../controller/chat/setUserSocket");
const getUserSelf = require("../controller/chat/getUserSelf");
async function socketConfig(server) {
  const io = socket(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    socket.on("join_room", async (data) => {
      if (socket.room) {
        // Leave the previous room
        socket.leave(socket.room);
      }
      // Join the new room
      socket.join(data);
      socket.room = data;
      socket.join(data);
      const result = await getMessage(data);
      io.in(data).emit("broadcast", result);
    });
    socket.on("send_message", async (data) => {
      console.log(
        "============================================================================data21",
        data
      );
      const setSocketMessag = await setSocketMessage(data);
      const result = await getMessage(data.roomId);
      io.to(data.roomId).emit("broadcast", result);
    });
    
    socket.on("join_room_self", async (roomSelf) => {
      socket.join(roomSelf);
      const result = await getUserSelf(roomSelf);
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
