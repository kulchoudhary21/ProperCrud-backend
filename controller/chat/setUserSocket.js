async function setUserMessage() {
  try {
    const data = await chat.findAll({
      where: {
        [Op.and]: [
          { userSenderId: userSenderId },
          { userReceiverId: userSenderId },
        ],
      },
    });
    console.log("dtetete", data);
    if (data && data.length > 0) {
      resp.status(200).json({
        status: 200,
        data: data,
        roomCheck: true,
      });
    } else {
      const creationData = await chat.create(req.body);
      resp.status(200).json({
        message: "created suucessfully",
        status: 200,
        roomCheck: false,
      });
    }
  } catch (err) {}
}
module.exports = setUserMessage;
