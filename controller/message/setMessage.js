const db = require("../../db/db");
const Validation = require("../../utils/errorMessage");
const message = db.messages;
async function setMessage(req, resp) {
  try {
    //console.log("rerere", req.body);
    if (req.body.messages) {
      const data = await message.create(req.body);
      //console.log("dtdtdt11", data);
      resp.status(200).json({
        message: "inserted meesage suucessfully",
        status: 200,
      });
    } else {
      resp.status(200).json({
        message: "message not found!",
        status: 200,
      });
    }
  } catch (err) {
    //console.log("error....: ", err);
    let msg = Validation(err);
    resp.status(400).json({
      message: msg,
      status: 400,
    });
  }
}
module.exports = setMessage;
