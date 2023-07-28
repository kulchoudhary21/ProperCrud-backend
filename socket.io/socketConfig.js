const socket = require("socket.io");
const getMessage = require("../controller/message/getMessage");
const setSocketMessage = require("../controller/message/setSocketMessage");
async function socketConfig(server) {
  const io = socket(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    console.log("socketId", socket.id);
    socket.on("join_room", async (data) => {
      console.log("rooommm...", data);
      socket.join(data);
      const result = await getMessage(data);
      io.in(data).emit("broadcast", result);
    });
    socket.on("send_message", async (data,lastMessages) => {
      const setSocketMessag = await setSocketMessage(data);
      const result = await getMessage(data.roomId);
      console.log("cccc",setSocketMessag)
      io.in(data.roomId).emit("broadcast", result,lastMessages);
    });
    socket.on("disconnect", () => {
      console.log("user Disconnect");
    });
  });
}

module.exports = socketConfig;
